import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent {
    fullName = '';
    email = '';
    password = '';
    error = '';
    success = '';

    constructor(private http: HttpClient, private router: Router) { }

    register() {
        this.error = '';
        this.success = '';
        const userData = {
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            role: 'admin' 


        };

        this.http.post<any>(`${environment.serverUrl}/api/auth/register`, userData).subscribe({
            next: (response) => {
                console.log('Registration successful', response);
                this.success = 'Registration successful! Redirecting to login...';
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 1500);
            },
            error: (err) => {
                console.error('Registration failed', err);
                this.error = err.error?.message || 'Registration failed. Please try again.';
            }
        });
    }
}
