import { Component } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { InventoryComponent } from "./inventory/inventory.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <h1>User Management</h1>
    <app-user-form></app-user-form>
    <app-user-list></app-user-list>
    <app-inventory></app-inventory>
  `,
    imports: [UserListComponent, UserFormComponent, InventoryComponent]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
