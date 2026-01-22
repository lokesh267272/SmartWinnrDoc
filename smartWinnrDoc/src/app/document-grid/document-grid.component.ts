import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-document-grid',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './document-grid.component.html'
})
export class DocumentGridComponent {
    @Input() documents: any[] = [];
    @Output() openUpload = new EventEmitter<void>();
    @Output() updateDocument = new EventEmitter<string>();
    @Output() viewHistory = new EventEmitter<any>();

    activeMenuDocId: string | null = null;
    isViewer = false;

    constructor() {
        if (typeof localStorage !== 'undefined') {
            const role = localStorage.getItem('userRole');
            this.isViewer = role === 'viewer';
        }
    }

    toggleMenu(event: Event, docId: string) {
        event.stopPropagation();
        if (this.activeMenuDocId === docId) {
            this.activeMenuDocId = null;
        } else {
            this.activeMenuDocId = docId;
        }
    }

    triggerViewHistory(event: Event, doc: any) {
        event.stopPropagation();
        this.viewHistory.emit(doc);
    }

    triggerOpenUpload() {
        this.openUpload.emit();
    }

    triggerUpdateDocument(event: Event, docId: string) {
        event.stopPropagation();
        this.updateDocument.emit(docId);
    }

    viewDocument(doc: any) {
        const url = `${environment.serverUrl}/uploads/${doc.filename}`;
        window.open(url, '_blank');
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
