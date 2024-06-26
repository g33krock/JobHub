import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { InventoryItem } from './inventory-item.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventory: InventoryItem[] = [];
  newItem: InventoryItem = {
    description: '',
    quantity: 0,
    purchase_price: 0,
    rental: false,
    sale_price: 0
  };
  selectedItem: InventoryItem | null = null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(data => {
      this.inventory = data;
    });
  }

  addInventory(): void {
    this.inventoryService.addInventory(this.newItem).subscribe(() => {
      this.loadInventory();
      this.newItem = {
        description: '',
        quantity: 0,
        purchase_price: 0,
        rental: false,
        sale_price: 0
      };
    });
  }

  updateInventory(): void {
    if (this.selectedItem && this.selectedItem.id !== undefined) {
      this.inventoryService.updateInventory(this.selectedItem).subscribe(() => {
        this.loadInventory();
        this.selectedItem = null;
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

  selectItem(item: InventoryItem): void {
    this.selectedItem = { ...item };
  }

  clearSelection(): void {
    this.selectedItem = null;
  }
}
