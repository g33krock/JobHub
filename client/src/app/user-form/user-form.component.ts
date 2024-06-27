// user-form.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from './user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  first_name = '';
  last_name = '';
  email = '';
  phone = '';
  street_address = '';
  city = '';
  state = '';
  zip = '';
  vendor = false;

  private subscription: Subscription | null = null;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.selectedUser$.subscribe(user => {
      if (user) {
        this.populateForm(user);
      } else {
        this.clearFormFields();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  populateForm(user: User): void {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.phone = user.phone;
    this.street_address = user.street_address;
    this.city = user.city;
    this.state = user.state;
    this.zip = user.zip;
    this.vendor = user.vendor;
  }

  clearFormFields(): void {
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.phone = '';
    this.street_address = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.vendor = false;
  }

  onSubmit(): void {
    const newUser: User = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      street_address: this.street_address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      vendor: this.vendor
    };

    if (this.userService.selectedUserSubject.value) {
      newUser.id = this.userService.selectedUserSubject.value.id;
      this.userService.updateUser(newUser).subscribe(
        response => {
          console.log('User updated successfully', response);
          this.clearFormFields();
          this.userService.clearSelectedUser();  // Clear the selected user after updating
          this.userService.loadUsers();
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    } else {
      this.userService.addUser(newUser).subscribe(
        response => {
          console.log('User added successfully', response);
          this.clearFormFields();
          this.userService.loadUsers();
        },
        error => {
          console.error('Error adding user', error);
        }
      );
    }
  }
}
