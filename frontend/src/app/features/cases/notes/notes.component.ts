import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faSave, 
  faTimes,
  faStickyNote,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Note } from '../../../core/models/note.model';
import { NoteService } from '../../../core/services/note.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() caseId: string = '';
  
  // Icons
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faSave = faSave;
  faTimes = faTimes;
  faStickyNote = faStickyNote;
  faSearch = faSearch;

  notes: Note[] = [];
  selectedNote: Note | null = null;
  isLoading = true;
  isEditing = false;
  isCreating = false;
  editForm: any = {};
  searchQuery = '';

  constructor(private http: HttpClient, private noteService: NoteService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  // In your component.ts
showConfirmModal = false;
selectedNoteIdToDelete: string | null = null;

openConfirmModal(noteId: string) {
  this.selectedNoteIdToDelete = noteId;
  this.showConfirmModal = true;
}

cancelDelete() {
  this.showConfirmModal = false;
  this.selectedNoteIdToDelete = null;
}

confirmDelete() {
  if (!this.selectedNoteIdToDelete) return;
  this.isLoading = true;
  this.noteService.deleteNote(this.selectedNoteIdToDelete).subscribe({
    next: (response) => {
      if (response.success) {
        this.notes = this.notes.filter(n => n.noteId !== this.selectedNoteIdToDelete);
        this.selectedNote = this.notes.length > 0 ? this.notes[0] : null;
      }
      this.isLoading = false;
      this.showConfirmModal = false;
    },
    error: (error) => {
      console.error('Error deleting note:', error);
      this.isLoading = false;
      this.showConfirmModal = false;
    }
  });
}


  fetchNotes(): void {
    this.isLoading = true;
    this.noteService.getAllNotes(this.caseId)
      .subscribe({
        next: (response) => {
          if (response.success && response.notes) {
            this.notes = response.notes;
            if (this.notes.length > 0 && !this.selectedNote) {
              this.selectNote(this.notes[0]);
            }
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching notes:', error);
          this.isLoading = false;
        }
      });
  }

  selectNote(note: Note): void {
    this.selectedNote = note;
    this.isEditing = false;
    this.isCreating = false;
  }

  startEditing(): void {
    if (this.selectedNote) {
      this.editForm = {
        title: this.selectedNote.title,
        content: this.selectedNote.content
      };
      this.isEditing = true;
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.isCreating = false;
  }

  saveNote(): void {
    if (!this.selectedNote && !this.isCreating) return;
    
    this.isLoading = true;
    const payload = {
      title: this.editForm.title,
      content: this.editForm.content,
      caseId: this.caseId
    };

    if (this.isCreating) {
      // Create new note
      this.noteService.createNote(payload).subscribe({
        next: (response) => {
          if (response.success) {
            this.isCreating = false;
            this.ngOnInit();
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating note:', error);
          this.isLoading = false;
        }
      });
    } else {
      // Update existing note
      this.noteService.updateNote(this?.selectedNote?.noteId, payload).subscribe({
        next: (response) => {
          if (response.success && this.selectedNote) {
            this.isEditing = false;
            this.ngOnInit();
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating note:', error);
          this.isLoading = false;
        }
      });
    }
  }

  deleteNote(): void {
    if (!this.selectedNote) return;
    
    if (confirm('Are you sure you want to delete this note?')) {
      this.isLoading = true;
      this.noteService.deleteNote(this.selectedNote.noteId).subscribe({
        next: (response) => {
          if (response.success) {
            this.notes = this.notes.filter(n => n.noteId !== this.selectedNote?.noteId);
            this.selectedNote = this.notes.length > 0 ? this.notes[0] : null;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting note:', error);
          this.isLoading = false;
        }
      });
    }
  }

  startCreating(): void {
    this.editForm = {
      title: '',
      content: ''
    };
    this.isCreating = true;
    this.isEditing = false;
    this.selectedNote = null;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  get filteredNotes(): Note[] {
    if (!this.searchQuery) return this.notes;
    return this.notes.filter(note => 
      note.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}