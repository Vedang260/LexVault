// case-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfoCircle, faUser, faFileAlt, faStickyNote, faClock, faComments, faReceipt, faHome, faFileInvoice, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CaseService } from '../../../core/services/case.service';
import { CaseOverviewComponent } from '../case-overview/case-overview.component';

@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CaseOverviewComponent],
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})
export class CaseDetailsComponent implements OnInit {
  // Icons for tabs
    icons: { [key: string]: IconDefinition } = {
        overview: faHome,
        client: faUser,
        documents: faFileAlt,
        notes: faStickyNote,
        timeline: faClock,
        chat: faComments,
        invoice: faFileInvoice
    };


  caseId: string = '';
  caseTitle: string = 'Sample Case Title';
  activeTab: string = 'overview';

  tabs = [
    { id: 'overview', title: 'Overview' },
    { id: 'client', title: 'Client Info' },
    { id: 'documents', title: 'Documents' },
    { id: 'notes', title: 'Notes' },
    { id: 'timeline', title: 'Timeline & Hearing' },
    { id: 'chat', title: 'Chat' },
    { id: 'invoice', title: 'Invoice & Payments' }
  ];

  constructor(private route: ActivatedRoute, private caseService: CaseService) {}

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('caseId') || '';
    this.caseService.getCaseDetails(this.caseId).subscribe({
        next: (response) => {
            if(response?.success && response?.caseDetails){
                this.caseTitle = response?.caseDetails?.title;
            }
        },
        error: (error) => {
            console.error('Error fetching assigned cases:', error);
        }
    });
    
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
}