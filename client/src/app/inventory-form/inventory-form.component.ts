import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { InventoryItem } from '../inventory/inventory-item.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit, OnChanges {
  @Input() showModal: boolean = false;
  @Input() selectedItem: InventoryItem | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() refreshList = new EventEmitter<void>();

  description = '';
  quantity = 0;
  purchase_price = 0;
  rental = false;
  sale_price = 0;

  constructor(public inventoryService: InventoryService) {}

  ngOnInit(): void {
    // Initial population if selectedItem is already set when component initializes
    if (this.selectedItem) {
      this.populateForm(this.selectedItem);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem'] && this.selectedItem) {
      this.populateForm(this.selectedItem);
    }
  }

  onCloseModal(): void {
    this.clearFormFields();
    this.closeModal.emit();
  }

  populateForm(item: InventoryItem): void {
    this.description = item.description;
    this.quantity = item.quantity;
    this.purchase_price = item.purchase_price;
    this.rental = item.rental;
    this.sale_price = item.sale_price;
  }

  clearFormFields(): void {
    this.description = '';
    this.quantity = 0;
    this.purchase_price = 0;
    this.rental = false;
    this.sale_price = 0;
  }

  submitForm(): void {
    const newItem: InventoryItem = {
      description: this.description,
      quantity: this.quantity,
      purchase_price: this.purchase_price,
      rental: this.rental,
      sale_price: this.sale_price
    };

    if (this.selectedItem) {
      newItem.id = this.selectedItem.id;
      this.inventoryService.updateInventory(newItem).subscribe(() => {
        this.clearFormFields();
        this.refreshList.emit(); // Emit event to refresh list
        this.closeModal.emit();
      });
    } else {
      this.inventoryService.addInventory(newItem).subscribe(() => {
        this.clearFormFields();
        this.refreshList.emit(); // Emit event to refresh list
        this.closeModal.emit();
      });
    }
  }
}
