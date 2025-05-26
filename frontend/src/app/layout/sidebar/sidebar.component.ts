import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUser, faUsers, faGavel, faFileAlt, faCalendarAlt, faChartBar, faCog, faSignOutAlt, faBriefcase, faFolderOpen, faBars, faScaleBalanced, faAdd, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../../core/constants/role.enum';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  icon: IconDefinition;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('sidebarAnimation', [
      state('expanded', style({
        width: '16rem',
      })),
      state('collapsed', style({
        width: '5rem',
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  role: Role | null = null;
  username: string | null = null;
  isExpanded = true;
  sidebarState = 'expanded';
  isLoading = true;
  faBars = faBars;
  faSignOutAlt = faSignOutAlt;
  faScaleBalanced = faScaleBalanced;
  private roleMap: { [key in Role]: string } = {
    [Role.ADMIN]: 'admin',
    [Role.LAWYER]: 'lawyer',
    [Role.CLIENT]: 'client'
  };

  navItemsByRole: { [key: string]: NavItem[] } = {
    admin: [
      { label: 'Dashboard', icon: faHome, route: '/dashboard' },
      { label: 'All Cases', icon: faFolderOpen, route: '/all-cases' },
      { label: 'Clients', icon: faUser, route: '/clients' },
      { label: 'Lawyers', icon: faUsers, route: '/lawyers' },
      { label: 'Hearings', icon: faGavel, route: '/hearings' },
      { label: 'Documents', icon: faFileAlt, route: '/documents' },
      { label: 'Calendar', icon: faCalendarAlt, route: '/calendar' },
      { label: 'Reports', icon: faChartBar, route: '/reports' },
      { label: 'Settings', icon: faCog, route: '/settings' },
    ],
    lawyer: [
      { label: 'Dashboard', icon: faHome, route: '/dashboard' },
      { label: 'My Cases', icon: faBriefcase, route: '/cases' },
      { label: 'Clients', icon: faUser, route: '/clients' },
      { label: 'Hearings', icon: faGavel, route: '/hearings' },
      { label: 'Documents', icon: faFileAlt, route: '/documents' },
      { label: 'Calendar', icon: faCalendarAlt, route: '/calendar' },
      { label: 'Settings', icon: faCog, route: '/settings' },
    ],
    client: [
      { label: 'Dashboard', icon: faHome, route: '/dashboard' },
      { label: 'Add New Case', icon: faAdd, route: '/client/addCase' },
      { label: 'My Cases', icon: faBriefcase, route: '/cases' },
      { label: 'Documents', icon: faFileAlt, route: '/documents' },
      { label: 'Chat', icon: faMessage, route: '/client/chat' },
      { label: 'Settings', icon: faCog, route: '/settings' }
    ]
  };

  filteredNavItems: NavItem[] = [];
  private subscriptions = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.authService.currentUser.subscribe(user => {
        if (user && user.role && user.username) {
          this.role = user.role;
          this.username = user.username;
          this.filteredNavItems = this.navItemsByRole[this.roleMap[this.role]] || [];
        } else {
          this.role = null;
          this.username = null;
          this.filteredNavItems = [];
        }
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getRoleDisplayName(): string {
    return this.role ? this.role.charAt(0).toUpperCase() + this.role.slice(1).toLowerCase() : '';
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.sidebarState = this.isExpanded ? 'expanded' : 'collapsed';
  }

  logout() {
    this.authService.logout();
  }
}