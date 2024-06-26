import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  name = '';
  email = '';
  password = '';

  constructor(private userService: UserService) { }

  onSubmit(): void {
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.userService.addUser(newUser).subscribe(
      response => {
        console.log('User added successfully', response);
        // Optionally reset the form or provide user feedback
        this.name = '';
        this.email = '';
        this.password = '';
      },
      error => {
        console.error('Error adding user', error);
      }
    );
  }
}
