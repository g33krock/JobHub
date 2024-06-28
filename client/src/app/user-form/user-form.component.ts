import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from './user.model';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() refreshList = new EventEmitter<void>();

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
        this.showModal = true; // Show modal when a user is selected
        console.log('User selected:', user);
      } else {
        this.clearFormFields();
        console.log('No user selected');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser']) {
      if (this.userService.selectedUserSubject.value) {
        console.log('Selected User:', this.userService.selectedUserSubject.value);
        this.populateForm(this.userService.selectedUserSubject.value);
      } else {
        console.log('No selected user');
      }
    }
  }

  onCloseModal(): void {
    this.clearFormFields();
    this.userService.clearSelectedUser();
    console.log('Modal closed and user cleared');
    this.closeModal.emit();
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

  submitForm(): void {
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
      this.userService.updateUser(newUser).subscribe(() => {
        this.clearFormFields();
        this.userService.clearSelectedUser();
        this.refreshList.emit(); // Emit event to refresh list
        this.closeModal.emit();
      });
    } else {
      this.userService.addUser(newUser).subscribe(() => {
        this.clearFormFields();
        this.userService.clearSelectedUser();
        this.refreshList.emit(); // Emit event to refresh list
        this.closeModal.emit();
      });
    }
  }
}
