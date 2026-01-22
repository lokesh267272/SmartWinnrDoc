import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { DocumentGridComponent } from '../document-grid/document-grid.component';
import { VersionHistoryModalComponent } from '../version-history-modal/version-history-modal.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, UploadModalComponent, DocumentGridComponent, VersionHistoryModalComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isUploadModalOpen = false;
  isHistoryModalOpen = false;
  targetDocumentId: string | null = null;
  selectedDocument: any = null;
  searchQuery: string = '';
  documents: any[] = [];
  allDocuments: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchDocuments();
    }
  }

  openUploadModal() {
    this.targetDocumentId = null;
    this.isUploadModalOpen = true;
  }

  openUpdateModal(docId: string) {
    this.targetDocumentId = docId;
    this.isUploadModalOpen = true;
  }

  openHistoryModal(doc: any) {
    this.selectedDocument = doc;
    this.isHistoryModalOpen = true;
  }

  closeHistoryModal() {
    this.isHistoryModalOpen = false;
    this.selectedDocument = null;
  }

  closeUploadModal() {
    this.isUploadModalOpen = false;
    this.targetDocumentId = null;
  }

  onUploadSuccess() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchDocuments();
    }
  }

  onSearch() {
    if (!this.searchQuery) {
      this.documents = [...this.allDocuments];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.documents = this.allDocuments.filter(doc =>
        doc.originalName.toLowerCase().includes(query)
      );
    }
  }

  onTagSelect(tag: string) {
    this.searchQuery = '';
    if (tag) {
      this.documents = this.allDocuments.filter(doc =>
        doc.tags && doc.tags.includes(tag)
      );
    } else {
      this.documents = [...this.allDocuments];
    }
  }

  fetchDocuments() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders().set('x-auth-token', token);

    this.http.get<any[]>(`${environment.serverUrl}/api/documents`, { headers }).subscribe({
      next: (docs) => {
        this.allDocuments = docs;
        this.documents = docs;

        if (this.searchQuery) {
          this.onSearch();
        }

        console.log('Documents fetched:', docs);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching documents', err)
    });
  }
}
