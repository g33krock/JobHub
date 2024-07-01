import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { ModalComponent } from "../modal/modal.component";
import { User } from '../user-form/user.model';
import { InventoryItem } from '../inventory/inventory-item.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  imports: [CommonModule, FormsModule, ModalComponent]
})
export class TransactionFormComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  vendors: User[] = [];
  customers: User[] = [];
  items: InventoryItem[] = [];
  selectedVendor: User | null = null;
  selectedCustomer: User | null = null;
  selectedItem: InventoryItem | null = null;
  quantity: number = 1;
  selectedItems: { item: InventoryItem, quantity: number }[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadItems();
  }

  loadUsers(): void {
    this.transactionService.getUsers().subscribe((users) => {
      this.vendors = users.filter(user => user.vendor);
      this.customers = users.filter(user => !user.vendor);
    });
  }

  loadItems(): void {
    this.transactionService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  addItem(): void {
    if (this.selectedItem && this.quantity > 0 && this.quantity <= this.selectedItem.quantity) {
      const item = { item: this.selectedItem, quantity: this.quantity };
      this.selectedItems.push(item);
      this.selectedItem = null;
      this.quantity = 1;
    }
  }

  removeItem(index: number): void {
    this.selectedItems.splice(index, 1);
  }

  itemTotal(item: { item: InventoryItem, quantity: number }): number {
    return item.item.sale_price * item.quantity;
  }

  get total(): number {
    return this.selectedItems.reduce((sum, item) => sum + this.itemTotal(item), 0);
  }

  submitForm(): void {
    if (this.selectedVendor && this.selectedCustomer) {
      const transactionData = {
        vendor_id: this.selectedVendor.id,
        customer_id: this.selectedCustomer.id,
        items: this.selectedItems.map(item => ({
          item_id: item.item.id,
          quantity: item.quantity,
          total: this.itemTotal(item)
        }))
      };
  
      this.transactionService.createTransaction(transactionData).subscribe(() => {
        this.clearForm();
        this.closeModal.emit();
      });
    }
  }
  

  onCloseModal(): void {
    this.clearForm();
    this.closeModal.emit();
  }

  clearForm(): void {
    this.selectedVendor = null;
    this.selectedCustomer = null;
    this.selectedItem = null;
    this.quantity = 1;
    this.selectedItems = [];
  }
}
