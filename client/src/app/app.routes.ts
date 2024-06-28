import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'inventory', component: InventoryListComponent }
];
