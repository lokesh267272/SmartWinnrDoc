import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    email = '';
    password = '';
    error = '';

    constructor(private http: HttpClient, private router: Router) { }

    login() {
        this.error = '';
        const credentials = { email: this.email, password: this.password };

       
        this.http.post<any>(`${environment.serverUrl}/api/auth/login`, credentials).subscribe({
            next: (response) => {
                console.log('Login successful', response);
               


                localStorage.setItem('token', response.token);
                localStorage.setItem('userRole', response.user.role);
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error('Login failed', err);
                this.error = err.error?.message || 'Login failed. Please check your credentials.';
            }
        });
    }
}
