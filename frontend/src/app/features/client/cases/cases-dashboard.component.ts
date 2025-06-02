import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  faSearch, 
  faFilter, 
  faFileAlt, 
  faCalendarAlt,
  faGavel,
  faBalanceScale,
  faExclamationTriangle,
  faCheckCircle,
  faClock,
  faSpinner,
  faTimesCircle,
  faCalendarCheck,
  faEye,
  faInfoCircle,
  faCalendar,
  faFile,
  faFolderOpen,
  faCircle,
  faHashtag,
  faRedo,
  faExclamationCircle,
  faFolder,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { animate, style, transition, trigger } from '@angular/animations';
import { CaseService } from '../../../core/services/case.service';
import { Case } from '../../../core/models/case.model';

@Component({
  selector: 'app-cases-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './cases-dashboard.component.html',
  styleUrls: ['./cases-dashboard.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CasesDashboardComponent implements OnInit {
  faSearch = faSearch;
  faFilter = faFilter;
  faFileAlt = faFileAlt;
  faCalendarAlt = faCalendarAlt;
  faGavel = faGavel;
  faBalanceScale = faBalanceScale;
  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;
  faClock = faClock;
  faSpinner = faSpinner;
  faTimesCircle = faTimesCircle;
  faCalendarCheck = faCalendarCheck;
  faEye = faEye;
  faInfoCircle = faInfoCircle;
  faCalendar = faCalendar;
  faFile = faFile;
  faFolderOpen = faFolderOpen;
  faCircle = faCircle;
  faHashtag = faHashtag;
  faRedo = faRedo;
  faExclamationCircle = faExclamationCircle;
  faFolder = faFolder;
  faPlus = faPlus;

  cases: Case[] = [];
  filteredCases: Case[] = [];
  isLoading = true;
  searchQuery = '';
  selectedStatus = 'all';
  selectedCategory = 'all';
  selectedPriority = 'all';

  statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'filed', label: 'Filed' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
    { value: 'rejected', label: 'Rejected' }
  ];

  categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'divorce', label: 'Divorce' },
    { value: 'criminal', label: 'Criminal' },
    { value: 'civil', label: 'Civil' },
    { value: 'property', label: 'Property' },
    { value: 'contract', label: 'Contract' }
  ];

  priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  constructor(private http: HttpClient, private caseService: CaseService) {}

  ngOnInit(): void {
    //this.fetchCases();
  }

    // fetchCases(): void {
    //     this.isLoading = true;
    //     this.caseService.getClientCases().subscribe({
    //         next: (response) => {
    //             if(response.cases){
    //                 this.cases = response.cases;
    //                 this.filteredCases = [...this.cases];
    //             }
    //         this.isLoading = false;
    //         },
    //         error: (error) => {
    //         console.error('Error fetching assigned cases:', error);
    //         this.isLoading = false;
    //         }
    //     });
    // }


  applyFilters(): void {
    this.filteredCases = this.cases.filter(caseItem => {
      const matchesSearch = caseItem.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          caseItem.caseNumber.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = this.selectedStatus === 'all' || caseItem.status === this.selectedStatus;
      const matchesCategory = this.selectedCategory === 'all' || caseItem.category === this.selectedCategory;
      const matchesPriority = this.selectedPriority === 'all' || caseItem.priority === this.selectedPriority;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedStatus = 'all';
    this.selectedCategory = 'all';
    this.selectedPriority = 'all';
    this.filteredCases = [...this.cases];
  }

  getStatusIcon(status: string) {
    switch(status) {
      case 'filed': return this.faFileAlt;
      case 'in_progress': return this.faSpinner;
      case 'closed': return this.faCheckCircle;
      case 'rejected': return this.faTimesCircle;
      default: return this.faClock;
    }
  }

  getStatusColor(status: string) {
    switch(status) {
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getPriorityColor(priority: string) {
    switch(priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getCategoryIcon(category: string) {
    switch(category) {
      case 'divorce': return this.faBalanceScale;
      case 'criminal': return this.faGavel;
      default: return this.faFileAlt;
    }
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
}