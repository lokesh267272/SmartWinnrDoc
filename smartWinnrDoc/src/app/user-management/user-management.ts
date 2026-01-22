import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.html'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  isCreateModalOpen = false;
  isEditModalOpen = false;
  selectedUser: any = null;

  // Form Data
  newUser = { fullName: '', email: '', password: '', role: 'viewer' };
  editUser = { id: '', fullName: '', email: '', role: '' };

  roles = ['admin', 'editor', 'viewer'];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchUsers();
    }
  }

  fetchUsers() {
    if (!isPlatformBrowser(this.platformId)) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders().set('x-auth-token', token);
    this.http.get<any[]>(`${environment.serverUrl}/api/users`, { headers }).subscribe({
      next: (data) => {
        this.users = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching users', err)
    });
  }

  openCreateModal() {
    this.newUser = { fullName: '', email: '', password: '', role: 'viewer' };
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  createUser() {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token!);

    this.http.post(`${environment.serverUrl}/api/users`, this.newUser, { headers }).subscribe({
      next: (res) => {
        console.log('User created', res);
        this.fetchUsers();
        this.closeCreateModal();
      },
      error: (err) => alert('Error creating user: ' + (err.error?.message || err.message))
    });
  }

  openEditModal(user: any) {
    this.selectedUser = user;
    this.editUser = { ...user, id: user._id };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedUser = null;
  }

  updateUser() {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token!);

    this.http.put(`${environment.serverUrl}/api/users/${this.editUser.id}`, this.editUser, { headers }).subscribe({
      next: (res) => {
        console.log('User updated', res);
        this.fetchUsers();
        this.closeEditModal();
      },
      error: (err) => alert('Error updating user: ' + (err.error?.message || err.message))
    });
  }

  deleteUser(userId: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!confirm('Are you sure you want to delete this user?')) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token!);

    this.http.delete(`${environment.serverUrl}/api/users/${userId}`, { headers }).subscribe({
      next: () => {
        this.fetchUsers();
      },
      error: (err) => alert('Error deleting user: ' + (err.error?.message || err.message))
    });
  }
}
