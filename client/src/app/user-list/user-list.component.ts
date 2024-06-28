import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';
import { User } from '../user-form/user.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  showUserModal = false;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    }, error => {
      console.error('Error loading users:', error);
    });
  }

  onSelectUser(user: User): void {
    this.userService.selectUser(user);
    this.showUserModal = true;
  }

  onAddUser(): void {
    this.userService.clearSelectedUser();
    this.showUserModal = true;
  }

  closeUserModal(): void {
    this.showUserModal = false;
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
