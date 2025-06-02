import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faEye, 
  faEdit, 
  faTrash, 
  faPlus,
  faClock,
  faDollarSign,
  faCheck,
  faTimes,
  faSearch,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeEntry } from '../../../core/models/timeEntry.model';
import { TimeEntryService } from '../../../core/services/timeEntry.service';

@Component({
  selector: 'app-time-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule, NgbModalModule],
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css']
})
export class TimeEntryComponent implements OnInit {
  @Input() caseId: string = '';
  
  // Icons
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faClock = faClock;
  faDollarSign = faDollarSign;
  faCheck = faCheck;
  faTimes = faTimes;
  faSearch = faSearch;
  faFilter = faFilter;

  timeEntries: TimeEntry[] = [];
  filteredEntries: TimeEntry[] = [];
  isLoading = true;
  searchQuery = '';
  showFilters = false;
  billableFilter: 'all' | 'billable' | 'non-billable' = 'all';
  billedFilter: 'all' | 'billed' | 'unbilled' = 'all';

  // Form variables
  isCreating = false;
  isEditing = false;
  selectedEntry: TimeEntry | null = null;
  timeEntryForm: any = {
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    duration: 60,
    title: '',
    description: '',
    billable: true,
    billed: false
  };

  constructor(
    private http: HttpClient,
    public modalService: NgbModal,
    private timeEntryService: TimeEntryService
  ) {}

  ngOnInit(): void {
    this.fetchTimeEntries();
  }

  fetchTimeEntries(): void {
    this.isLoading = true;
    this.timeEntryService.getAllTimeEntries(this.caseId).subscribe({
      next: (response) => {
        if (response.success) {
          this.timeEntries = response.timeEntries;
          this.applyFilters();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching time entries:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredEntries = this.timeEntries.filter(entry => {
      // Filter by search query
      if (this.searchQuery && 
          !entry.title.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by billable status
      if (this.billableFilter !== 'all') {
        if (this.billableFilter === 'billable' && !entry.billable) return false;
        if (this.billableFilter === 'non-billable' && entry.billable) return false;
      }
      
      // Filter by billed status
      if (this.billedFilter !== 'all') {
        if (this.billedFilter === 'billed' && !entry.billed) return false;
        if (this.billedFilter === 'unbilled' && entry.billed) return false;
      }
      
      return true;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.billableFilter = 'all';
    this.billedFilter = 'all';
    this.applyFilters();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  formatTime(timeString: string): string {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  viewEntry(entry: TimeEntry, content: any): void {
    this.selectedEntry = entry;
    this.modalService.open(content, { size: 'lg' , role: 'dialog'});
  }

  startCreating(): void {
    this.timeEntryForm = {
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      duration: 60,
      title: '',
      description: '',
      billable: true,
      billed: false
    };
    this.isCreating = true;
    this.isEditing = false;
  }

  startEditing(entry: TimeEntry): void {
    this.selectedEntry = entry;
    this.timeEntryForm = {
      date: entry.date,
      startTime: this.formatTimeForInput(entry.startTime),
      endTime: this.formatTimeForInput(entry.endTime),
      duration: entry.duration,
      title: entry.title,
      description: entry.description,
      billable: entry.billable,
      billed: entry.billed
    };
    this.isEditing = true;
    this.isCreating = false;
  }

  formatTimeForInput(timeString: string): string {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toTimeString().substring(0, 5);
  }

  calculateDuration(): void {
    if (this.timeEntryForm.startTime && this.timeEntryForm.endTime) {
      const start = new Date(`2000-01-01T${this.timeEntryForm.startTime}`);
      const end = new Date(`2000-01-01T${this.timeEntryForm.endTime}`);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60); // in minutes
      this.timeEntryForm.duration = diff > 0 ? diff : 0;
    }
  }

  saveTimeEntry(): void {
    const payload = {
      ...this.timeEntryForm,
      caseId: this.caseId,
      startTime: `${this.timeEntryForm.date}T${this.timeEntryForm.startTime}:00.000Z`,
      endTime: `${this.timeEntryForm.date}T${this.timeEntryForm.endTime}:00.000Z`
    };

    if (this.isCreating) {
      this.timeEntryService.createTimeEntry(payload).subscribe({
        next: (response) => {
          if (response.success) {
            //this.timeEntries.unshift(response.timeEntry);
            this.applyFilters();
            this.modalService.dismissAll();
          }
        },
        error: (error) => {
          console.error('Error creating time entry:', error);
        }
      });
    } else {
      this.timeEntryService.updateTimeEntry(
        this.selectedEntry?.timeEntryId,
        payload
      ).subscribe({
        next: (response) => {
          if (response.success) {
            //const index = this.timeEntries.findIndex(e => e.timeEntryId === response.timeEntry.timeEntryId);
            // if (index !== -1) {
            //   this.timeEntries[index] = response.timeEntry;
            //   this.applyFilters();
            //   this.modalService.dismissAll();
            // }
          }
        },
        error: (error) => {
          console.error('Error updating time entry:', error);
        }
      });
    }
  }

  confirmDelete(entry: TimeEntry): void {
    if (confirm('Are you sure you want to delete this time entry?')) {
      this.http.delete<{success: boolean}>(
        `https://api.yourdomain.com/time-entries/${entry.timeEntryId}`
      ).subscribe({
        next: (response) => {
          if (response.success) {
            this.timeEntries = this.timeEntries.filter(e => e.timeEntryId !== entry.timeEntryId);
            this.applyFilters();
          }
        },
        error: (error) => {
          console.error('Error deleting time entry:', error);
        }
      });
    }
  }
}