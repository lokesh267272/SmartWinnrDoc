import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-version-history-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 blur-sm-backend" (click)="triggerClose()">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[80vh] flex flex-col" (click)="$event.stopPropagation()">
        <div class="flex justify-between items-center mb-4">
            <div>
                <h2 class="text-xl font-bold text-gray-800">Version History</h2>
                <p class="text-sm text-gray-500">{{ document?.originalName }}</p>
            </div>
            <button (click)="triggerClose()" class="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div class="flex-1 overflow-y-auto">
            <div *ngIf="!document?.versions || document.versions.length === 0" class="text-center py-8 text-gray-500">
                No history available.
            </div>

            <div class="space-y-4">
                <div *ngFor="let version of getSortedVersions(); let i = index" 
                     class="flex items-center justify-between p-3 rounded-lg border"
                     [class.border-blue-200]="i === 0"
                     [class.bg-blue-50]="i === 0"
                     [class.border-gray-100]="i !== 0">
                    
                    <div class="flex items-center gap-3">
                        <div class="p-2 rounded-full" [class.bg-blue-100]="i === 0" [class.bg-gray-100]="i !== 0">
                            <span class="text-xs font-bold" [class.text-blue-600]="i === 0" [class.text-gray-500]="i !== 0">V{{ getSortedVersions().length - i }}</span>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-800">{{ version.originalName }}</p>
                            <p class="text-xs text-gray-500">{{ version.createdAt | date:'medium' }} • {{ formatFileSize(version.size) }}</p>
                        </div>
                    </div>

                    <a [href]="getFileUrl(version.filename)" target="_blank" 
                       class="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded hover:bg-blue-100 transition-colors">
                        View
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,
    styles: []
})
export class VersionHistoryModalComponent {
    @Input() document: any = null;
    @Output() closeModal = new EventEmitter<void>();

    triggerClose() {
        this.closeModal.emit();
    }

    getSortedVersions() {
        if (!this.document || !this.document.versions) return [];
        // Sort by date descending (newest first)
        return [...this.document.versions].sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    getFileUrl(filename: string): string {
        return `${environment.serverUrl}/uploads/${filename}`;
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
