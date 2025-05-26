import { Component, Input } from '@angular/core';
import { 
  faHome, 
  faUser, 
  faUsers, 
  faGavel, 
  faFileAlt, 
  faCalendarAlt, 
  faChartBar, 
  faCog,
  faSignOutAlt,
  faBriefcase,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons';

interface NavItem {
  label: string;
  icon: any;
  route: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() role: 'admin' | 'lawyer' | 'client' = 'client';
  @Input() username: string = 'User';
  
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: faHome, route: '/dashboard', roles: ['admin', 'lawyer', 'client'] },
    { label: 'My Cases', icon: faBriefcase, route: '/cases', roles: ['lawyer', 'client'] },
    { label: 'All Cases', icon: faFolderOpen, route: '/all-cases', roles: ['admin'] },
    { label: 'Clients', icon: faUser, route: '/clients', roles: ['admin', 'lawyer'] },
    { label: 'Lawyers', icon: faUsers, route: '/lawyers', roles: ['admin'] },
    { label: 'Hearings', icon: faGavel, route: '/hearings', roles: ['admin', 'lawyer'] },
    { label: 'Documents', icon: faFileAlt, route: '/documents', roles: ['admin', 'lawyer', 'client'] },
    { label: 'Calendar', icon: faCalendarAlt, route: '/calendar', roles: ['admin', 'lawyer'] },
    { label: 'Reports', icon: faChartBar, route: '/reports', roles: ['admin'] },
    { label: 'Settings', icon: faCog, route: '/settings', roles: ['admin', 'lawyer', 'client'] },
  ];

  filteredNavItems: NavItem[] = [];
  faSignOutAlt = faSignOutAlt;

  ngOnInit() {
    this.filteredNavItems = this.navItems.filter(item => item.roles.includes(this.role));
  }

  getRoleDisplayName() {
    return {
      'admin': 'Administrator',
      'lawyer': 'Lawyer',
      'client': 'Client'
    }[this.role];
  }
}