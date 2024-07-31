import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InventoryService } from '../inventory.service';
import { InventoryItem } from '../inventory/inventory-item.model';
import { InventoryFormComponent } from '../inventory-form/inventory-form.component';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, InventoryFormComponent],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  inventory: InventoryItem[] = [];
  showInventoryModal = false;
  selectedInventoryItem: InventoryItem | null = null;

  constructor(public inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(data => {
      this.inventory = data;
    });
  }

  onSelectItem(item: InventoryItem): void {
    this.selectedInventoryItem = item;
    console.log('Inventory item selected:', item);
    this.showInventoryModal = true;
  }

  onAddItem(): void {
    this.selectedInventoryItem = null;
    this.showInventoryModal = true;
  }

  closeInventoryModal(): void {
    this.showInventoryModal = false;
  }

  deleteItem(id: number): void {
    this.inventoryService.deleteInventory(id).subscribe(() => {
      this.loadInventory();
    });
  }
}
