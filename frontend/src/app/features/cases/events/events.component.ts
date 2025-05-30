import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  faCalendarAlt,
  faFilter,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EventType } from '../../../core/constants/event.enum';
import { Event } from '../../../core/models/event.model';
import { EventsService } from '../../../core/services/events.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule, 
    FontAwesomeModule,
    FullCalendarModule,
    NgbDatepickerModule
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Input() caseId: string = '';
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  // Icons
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faSave = faSave;
  faTimes = faTimes;
  faCalendarAlt = faCalendarAlt;
  faFilter = faFilter;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  events: Event[] = [];
  filteredEvents: Event[] = [];
  calendarEvents: EventInput[] = [];
  isLoading = true;
  isCreating = false;
  isEditing = false;
  selectedEvent: Event | null = null;
  eventForm: any = {};
  eventTypes = Object.values(EventType);
  
  // Filter options
  showFilters = false;
  typeFilter: EventType | 'all' = 'all';
  fromDate: NgbDateStruct | null = null;
  toDate: NgbDateStruct | null = null;

  // Calendar options
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    eventDisplay: 'block',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    },
    eventContent: this.customEventContent.bind(this),
    eventDidMount: this.eventDidMount.bind(this)
  };

  constructor(private http: HttpClient, private eventService: EventsService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.eventService.getAllCaseEvents(this.caseId).subscribe({
        next: (response) => {
          if (response?.success) {
            this.events = response?.events;
            this.filteredEvents = [...this.events];
            
            this.isLoading = false;
            this.updateCalendarEvents();
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching events:', error);
          this.isLoading = false;
        }
    });
  }

  updateCalendarEvents(): void {
    this.calendarEvents = this.filteredEvents.map(event => ({
      id: event.eventId,
      title: event.title,
      date: event.eventDate,
      extendedProps: {
        type: event.type,
        time: event.eventTime,
        description: event.description
      },
      backgroundColor: this.getEventColor(event.type),
      borderColor: this.getEventColor(event.type)
    }));

    this.calendarOptions.events = this?.calendarEvents;
    const calendarApi = this?.calendarComponent.getApi();
    calendarApi.removeAllEvents();
    calendarApi.addEventSource(this.calendarEvents);
  }

  getEventColor(type: EventType): string {
    switch(type) {
      case EventType.HEARING: return '#3f51b5'; // Blue
      case EventType.MEETING: return '#4caf50'; // Green
      case EventType.DEADLINE: return '#ff9800'; // Orange
      case EventType.TRIAL: return '#f44336'; // Red
      case EventType.DEPOSITION: return '#9c27b0'; // Purple
      case EventType.FILING: return '#dce1e3'; // Gray
      default: return '#2196f3'; // Default blue
    }
  }

  getEventTypeLabel(type: EventType): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const eventId = clickInfo.event.id;
    this.selectedEvent = this.events.find(e => e.eventId === eventId) || null;
    this.highlightTableRow(eventId);
  }

  highlightTableRow(eventId: string): void {
    // This will be handled in the template with [class.highlighted]
  }

  customEventContent(arg: any): any {
    const type = arg.event.extendedProps.type;
    const time = arg.event.extendedProps.time;
    
    return {
      html: `
        <div class="fc-event-content">
          <div class="event-type-badge" style="background-color: ${this.getEventColor(type)}" ></div>
          <div class="event-type" style="">${type.toUpperCase()}</div>
          <div class="event-title">${arg.event.title}</div>
          <div class="event-time">${time}</div>
        </div>
      `
    };
  }

  eventDidMount(arg: any): void {
    if (this.selectedEvent && arg.event.id === this.selectedEvent.eventId) {
      arg.el.classList.add('highlighted-event');
    }
  }

  prevMonth(): void {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.prev();
  }

  nextMonth(): void {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
  }

  today(): void {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.today();
  }

  startCreating(): void {
    this.eventForm = {
      title: '',
      description: '',
      eventDate: new Date().toISOString().split('T')[0],
      eventTime: '09:00',
      type: EventType.HEARING
    };
    this.isCreating = true;
    this.isEditing = false;
    this.selectedEvent = null;
  }

  startEditing(event: Event): void {
    this.eventForm = { ...event };
    this.isEditing = true;
    this.isCreating = false;
    this.selectedEvent = event;
  }

  cancelForm(): void {
    this.isCreating = false;
    this.isEditing = false;
    this.selectedEvent = null;
  }

  saveEvent(): void {
    if (this.isCreating) {
      this.createEvent();
    } else {
      this.updateEvent();
    }
  }

  createEvent(): void {
    this.isLoading = true;
    this.http.post<{success: boolean, event: Event}>(
      `https://api.yourdomain.com/cases/${this.caseId}/events`,
      this.eventForm
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.events.unshift(response.event);
          this.applyFilters();
          this.cancelForm();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating event:', error);
        this.isLoading = false;
      }
    });
  }

  updateEvent(): void {
    if (!this.selectedEvent) return;
    
    this.isLoading = true;
    this.http.put<{success: boolean, event: Event}>(
      `https://api.yourdomain.com/cases/${this.caseId}/events/${this.selectedEvent.eventId}`,
      this.eventForm
    ).subscribe({
      next: (response) => {
        if (response.success) {
          const index = this.events.findIndex(e => e.eventId === this.selectedEvent?.eventId);
          if (index !== -1) {
            this.events[index] = response.event;
            this.applyFilters();
            this.cancelForm();
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating event:', error);
        this.isLoading = false;
      }
    });
  }

  deleteEvent(eventId: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.isLoading = true;
      this.eventService.deleteEvent(eventId).subscribe({
        next: (response) => {
          if (response.success) {
            this.events = this.events.filter(e => e.eventId !== eventId);
            this.applyFilters();
            if (this.selectedEvent?.eventId === eventId) {
              this.selectedEvent = null;
            }
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting event:', error);
          this.isLoading = false;
        }
      });
    }
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    if (!this.showFilters) {
      this.resetFilters();
    }
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter(event => {
      // Filter by type
      if (this.typeFilter !== 'all' && event.type !== this.typeFilter) {
        return false;
      }
      
      // Filter by date range
      const eventDate = new Date(event.eventDate);
      
      if (this.fromDate) {
        const fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
        if (eventDate < fromDate) return false;
      }
      
      if (this.toDate) {
        const toDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
        if (eventDate > toDate) return false;
      }
      
      return true;
    });
    
    this.updateCalendarEvents();
  }

  resetFilters(): void {
    this.typeFilter = 'all';
    this.fromDate = null;
    this.toDate = null;
    this.filteredEvents = [...this.events];
    this.updateCalendarEvents();
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  onTableRowClick(event: Event): void {
    this.selectedEvent = event;
    // Scroll to the event in the calendar
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate(event.eventDate);
  }
}