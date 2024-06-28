import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { InventoryService } from './inventory.service';
import { User } from './user-form/user.model';
import { InventoryItem } from './inventory/inventory-item.model';
import { UserFormComponent } from './user-form/user-form.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserFormComponent,
    InventoryFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showUserModal = false;
  showInventoryModal = false;
  selectedInventoryItem: InventoryItem | null = null;

  constructor(public userService: UserService, public inventoryService: InventoryService) {}

  openUserModal() {
    this.showUserModal = true;
    console.log('User modal state: open', this.showUserModal);
  }
  
  closeUserModal() {
    this.showUserModal = false;
    this.userService.clearSelectedUser();
    console.log('User modal state: closed', this.showUserModal);
  }
  
  openInventoryModal() {
    this.showInventoryModal = true;
    console.log('Inventory modal state: open', this.showInventoryModal);
  }
  
  closeInventoryModal() {
    this.showInventoryModal = false;
    this.selectedInventoryItem = null;
    console.log('Inventory modal state: closed', this.showInventoryModal);
  }
  
  onSelectUser(user: User): void {
    this.userService.selectUser(user);
    this.openUserModal();
  }
  
  onSelectInventoryItem(item: InventoryItem): void {
    this.selectedInventoryItem = item;
    this.openInventoryModal();
  }
  
}
