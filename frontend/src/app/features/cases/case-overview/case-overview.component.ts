import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faEdit, 
  faSave, 
  faTimes, 
  faCalendarAlt,
  faBalanceScale,
  faExclamationTriangle,
  faCheckCircle,
  faHourglassHalf
} from '@fortawesome/free-solid-svg-icons';
import { CaseService } from '../../../core/services/case.service';
import { Case } from '../../../core/models/case.model';

@Component({
  selector: 'app-case-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule],
  templateUrl: './case-overview.component.html',
  styleUrls: ['./case-overview.component.css']
})
export class CaseOverviewComponent implements OnInit {
  @Input() caseId: string = '';
  
  // Icons
  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;
  faCalendarAlt = faCalendarAlt;
  faBalanceScale = faBalanceScale;
  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;
  faHourglassHalf = faHourglassHalf;

  caseDetails: Case | null = null;
  isLoading = true;
  isEditing = false;
  editForm: any = {};
  originalDetails: Case | null = null;

  constructor(private http: HttpClient, private caseService: CaseService) {}

  ngOnInit(): void {
    this.fetchCaseDetails();
  }

  fetchCaseDetails(): void {
        this.isLoading = true;
        this.caseService.getCaseDetails(this.caseId).subscribe({
            next: (response) => {
                if(response.success && response.caseDetails){
                    this.caseDetails = response.caseDetails;
                }
            this.isLoading = false;
            },
            error: (error) => {
            console.error('Error fetching assigned cases:', error);
            this.isLoading = false;
            }
        });
    }

  startEditing(): void {
    if (this.caseDetails) {
      this.editForm = {...this.caseDetails};
      this.isEditing = true;
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
    if (this.originalDetails) {
      this.caseDetails = {...this.originalDetails};
    }
  }

  saveChanges(): void {
    if (!this.caseDetails) return;
    
    this.isLoading = true;
    this.http.put(`https://api.yourdomain.com/cases/${this.caseId}`, this.editForm)
      .subscribe({
        next: () => {
          this.caseDetails = {...this.editForm};
          this.originalDetails = {...this.editForm};
          this.isEditing = false;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating case:', error);
          this.isLoading = false;
        }
      });
  }

  getStatusIcon(status: string) {
    switch(status.toLowerCase()) {
      case 'filed': return faHourglassHalf;
      case 'in_progress': return faHourglassHalf;
      case 'closed': return faCheckCircle;
      case 'rejected': return faExclamationTriangle;
      default: return faHourglassHalf;
    }
  }

  getStatusColor(status: string): string {
    switch(status.toLowerCase()) {
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getPriorityColor(priority: string): string {
    switch(priority.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
}