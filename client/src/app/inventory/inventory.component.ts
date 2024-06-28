import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { InventoryItem } from './inventory-item.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnChanges {
  @Input() showModal: boolean = false;
  @Input() selectedItem: InventoryItem | null = null;
  @Output() closeModal = new EventEmitter<void>();

  inventory: InventoryItem[] = [];
  newItem: InventoryItem = {
    description: '',
    quantity: 0,
    purchase_price: 0,
    rental: false,
    sale_price: 0
  };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem'] && this.selectedItem) {
      this.populateForm(this.selectedItem);
    }
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(data => {
      this.inventory = data;
    });
  }

  addInventory(): void {
    this.inventoryService.addInventory(this.newItem).subscribe(() => {
      this.loadInventory();
      this.clearFormFields();
      this.closeModal.emit();
    });
  }

  updateInventory(): void {
    if (this.selectedItem && this.selectedItem.id !== undefined) {
      this.inventoryService.updateInventory(this.selectedItem).subscribe(() => {
        this.loadInventory();
        this.selectedItem = null;
        this.clearFormFields();
        this.closeModal.emit();
      });
    }
  }

  deleteInventory(id: number | undefined): void {
    if (id !== undefined) {
      this.inventoryService.deleteInventory(id).subscribe(() => {
        this.loadInventory();
      });
    }
  }

  populateForm(item: InventoryItem): void {
    this.newItem = { ...item };
  }

  clearFormFields(): void {
    this.newItem = {
      description: '',
      quantity: 0,
      purchase_price: 0,
      rental: false,
      sale_price: 0
    };
  }
}
