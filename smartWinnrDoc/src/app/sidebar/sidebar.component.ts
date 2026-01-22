import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    isTagsOpen = true;
    availableTags = ['Important', 'Work', 'Personal', 'Archive', 'Project'];
    isViewer = false;
    isAdmin = false;

    @Output() openUpload = new EventEmitter<void>();
    @Output() selectTag = new EventEmitter<string>();

    constructor(private router: Router) {
       
        if (typeof localStorage !== 'undefined') {
            const role = localStorage.getItem('userRole');
            this.isViewer = role === 'viewer';
            this.isAdmin = role === 'admin';
        }
    }

    toggleTags() {
        this.isTagsOpen = !this.isTagsOpen;
    }

    triggerSelectTag(tag: string) {
        this.selectTag.emit(tag);
    }


    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    triggerOpenUpload() {
        this.openUpload.emit();
    }

    navigateToUsers() {
        this.router.navigate(['/admin/users']);
    }
}
