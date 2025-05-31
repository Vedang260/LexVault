import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFileImage,
  faFileAlt,
  faDownload,
  faEye,
  faTrash,
  faPlus,
  faEdit,
  faTimes,
  faCheck,
  faLock,
  faSearch,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../../../core/services/document.service';

export enum DocumentType {
  PLEADING = 'pleading',
  EVIDENCE = 'evidence',
  CONTRACT = 'contract',
  CORRESPONDENCE = 'correspondence',
  REPORT = 'report',
  AFFIDAVIT = 'affidavit',
}

export interface Tag {
  tagId: string;
  name: string;
  colorCode: string;
}

export interface Document {
  documentId: string;
  documentType: DocumentType;
  documentUrl: string;
  caseId: string;
  userId: string;
  title: string;
  description: string;
  version: number;
  uploadedAt: string;
  isConfidential: boolean;
  uploadedBy: {
    role: string;
    firstName?: string;
    lastName?: string;
  };
  tags: Tag[];
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule, NgbModalModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input() caseId: string = '';
  
  // Icons
  faFilePdf = faFilePdf;
  faFileWord = faFileWord;
  faFileExcel = faFileExcel;
  faFileImage = faFileImage;
  faFileAlt = faFileAlt;
  faDownload = faDownload;
  faEye = faEye;
  faTrash = faTrash;
  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;
  faCheck = faCheck;
  faLock = faLock;
  faSearch = faSearch;
  faFilter = faFilter;

  documents: Document[] = [];
  filteredDocuments: Document[] = [];
  isLoading = true;
  searchQuery = '';
  documentTypes = Object.values(DocumentType);
  selectedType: DocumentType | 'all' = 'all';
  showFilters = false;
  allTags: Tag[] = [];
  selectedFile: File | null = null;

  // Form variables
  isCreating = false;
  isEditing = false;
  documentForm: any = {
    title: '',
    description: '',
    documentType: DocumentType.PLEADING,
    version: 1,
    isConfidential: false,
    tagIds: []
  };

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.fetchDocuments();
    this.fetchTags();
  }

  fetchDocuments(): void {
    this.isLoading = true;
    this.documentService.getAllCaseRelatedDocuments(this.caseId).subscribe({
      next: (response) => {
        if (response.success) {
          this.documents = response.documents;
          this.applyFilters();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching documents:', error);
        this.isLoading = false;
      }
    });
  }

  fetchTags(): void {
    this.documentService.getAllTags().subscribe({
      next: (response) => {
        if (response.success) {
          this.allTags = response.tags;
        }
      },
      error: (error) => {
        console.error('Error fetching tags:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredDocuments = this.documents.filter(doc => {
      // Filter by search query
      if (this.searchQuery && 
          !doc.title.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by document type
      if (this.selectedType !== 'all') {
        return false;
      }
      
      return true;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedType = 'all';
    this.applyFilters();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  getDocumentIcon(type: DocumentType): any {
    switch(type) {
      case DocumentType.PLEADING: return faFileAlt;
      case DocumentType.EVIDENCE: return faFileImage;
      case DocumentType.CONTRACT: return faFileWord;
      case DocumentType.CORRESPONDENCE: return faFileAlt;
      case DocumentType.REPORT: return faFileWord;
      case DocumentType.AFFIDAVIT: return faFileWord;
      default: return faFileAlt;
    }
  }

  getDocumentTypeLabel(type: DocumentType): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  viewDocument(url: string): void {
    window.open(url, '_blank');
  }

  downloadDocument(url: string, title: string): void {
    const a = document.createElement('a');
    a.href = url;
    a.download = title || 'document';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  confirmDelete(modal: any, documentId: string): void {
    this.modalService.open(modal).result.then(
      (result) => {
        if (result === 'delete') {
          this.deleteDocument(documentId);
        }
      },
      () => {}
    );
  }

  deleteDocument(documentId: string): void {
    this.http.delete<{success: boolean}>(
      `https://api.yourdomain.com/documents/${documentId}`
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.documents = this.documents.filter(doc => doc.documentId !== documentId);
          this.applyFilters();
        }
      },
      error: (error) => {
        console.error('Error deleting document:', error);
      }
    });
  }

  startCreating(): void {
    this.documentForm = {
      title: '',
      description: '',
      documentType: DocumentType.PLEADING,
      version: 1,
      isConfidential: false,
      tagIds: []
    };
    this.selectedFile = null;
    this.isCreating = true;
    this.isEditing = false;
  }

  startEditing(document: Document): void {
    this.documentForm = {
      title: document.title,
      description: document.description,
      documentType: document.documentType,
      version: document.version,
      isConfidential: document.isConfidential,
      tagIds: document.tags.map(tag => tag.tagId),
      documentUrl: document.documentUrl
    };
    this.isEditing = true;
    this.isCreating = false;
  }

  cancelForm(): void {
    this.isCreating = false;
    this.isEditing = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  toggleTag(tagId: string): void {
    const index = this.documentForm.tagIds.indexOf(tagId);
    if (index === -1) {
      this.documentForm.tagIds.push(tagId);
    } else {
      this.documentForm.tagIds.splice(index, 1);
    }
  }

  isTagSelected(tagId: string): boolean {
    return this.documentForm.tagIds.includes(tagId);
  }

  uploadDocument(): void {
    if (!this.selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<{success: boolean, documentUrl: string}>(
      'https://api.yourdomain.com/upload',
      formData
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.documentForm.documentUrl = response.documentUrl;
          this.saveDocument();
        }
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      }
    });
  }

  saveDocument(): void {
    const payload = {
      ...this.documentForm,
      caseId: this.caseId
    };

    if (this.isCreating) {
      this.http.post<{success: boolean, document: Document}>(
        'https://api.yourdomain.com/documents',
        payload
      ).subscribe({
        next: (response) => {
          if (response.success) {
            this.documents.unshift(response.document);
            this.applyFilters();
            this.cancelForm();
          }
        },
        error: (error) => {
          console.error('Error creating document:', error);
        }
      });
    } else {
      this.http.put<{success: boolean, document: Document}>(
        `https://api.yourdomain.com/documents/${this.documentForm.documentId}`,
        payload
      ).subscribe({
        next: (response) => {
          if (response.success) {
            const index = this.documents.findIndex(d => d.documentId === response.document.documentId);
            if (index !== -1) {
              this.documents[index] = response.document;
              this.applyFilters();
              this.cancelForm();
            }
          }
        },
        error: (error) => {
          console.error('Error updating document:', error);
        }
      });
    }
  }
}