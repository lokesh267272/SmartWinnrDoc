import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-upload-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './upload-modal.component.html'
})
export class UploadModalComponent {
    selectedFile: File | null = null;
    selectedTags: string[] = [];
    availableTags = ['Important', 'Work', 'Personal', 'Archive', 'Project'];
    @Input() targetDocumentId: string | null = null; 

    @Output() closeModal = new EventEmitter<void>();
    @Output() uploadSuccess = new EventEmitter<void>();

    constructor(private http: HttpClient) { }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }

    toggleTagSelection(tag: string) {
        if (this.selectedTags.includes(tag)) {
            this.selectedTags = this.selectedTags.filter(t => t !== tag);
        } else {
            this.selectedTags.push(tag);
        }
    }

    triggerClose() {
        this.closeModal.emit();
    }

    submitUpload() {
        if (!this.selectedFile) {
            alert('Please select a file.');
            return;
        }

       
        const userRole = localStorage.getItem('userRole');
        if (userRole && !['admin', 'editor'].includes(userRole)) {
            alert('You do not have permission to upload files. You need admin or editor role. Your current role: ' + userRole);
            return;
        }

        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('tags', JSON.stringify(this.selectedTags));

        const token = localStorage.getItem('token');
        if (!token) {
           
            alert('Session expired. Please login again.');
            return;
        }


        const headers = new HttpHeaders({
            'x-auth-token': token
           
        });

        let url = `${environment.serverUrl}/api/documents`;
        if (this.targetDocumentId) {
            url = `${environment.serverUrl}/api/documents/${this.targetDocumentId}/version`;
        }

        this.http.post<any>(url, formData, { headers }).subscribe({
            next: (response) => {
                alert('File uploaded successfully!');
                this.uploadSuccess.emit();
                this.triggerClose();
            },
            error: (err) => {
                let errorMessage = 'Unknown error occurred';
                
                if (err.status === 0) {
                    errorMessage = `Failed to connect to server. Please check if the server is running on ${environment.serverUrl}`;
                } else if (err.status === 401) {
                    errorMessage = 'Authentication failed. Please login again.';
                } else if (err.status === 403) {
                    errorMessage = 'Access denied. You need admin or editor role to upload files. Your current role: ' + (userRole || 'unknown');
                } else if (err.status === 400) {
                    errorMessage = err.error?.message || 'Bad request. Please check your file.';
                } else if (err.error?.message) {
                    errorMessage = err.error.message;
                } else if (err.message) {
                    errorMessage = err.message;
                }
                
                console.error('Upload failed:', errorMessage);
                alert('Upload failed: ' + errorMessage);
            }
        });
    }
}
