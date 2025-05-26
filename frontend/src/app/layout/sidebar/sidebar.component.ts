import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { faHome, faUser, faUsers, faGavel, faFileAlt, faCalendarAlt, faChartBar, faCog, faSignOutAlt, faBriefcase, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../../core/constants/role.enum';

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
export class SidebarComponent implements OnInit, OnDestroy {
  role: Role = Role.CLIENT;
  username: string = 'User';

  navItemsByRole: { [key: string]: NavItem[] } = {
    admin: [
      { label: 'Dashboard', icon: faHome, route: '/dashboard', roles: [] },
      { label: 'All Cases', icon: faFolderOpen, route: '/all-cases', roles: [] },
      { label: 'Clients', icon: faUser, route: '/clients', roles: [] },
      { label: 'Lawyers', icon: faUsers, route: '/lawyers', roles: [] },
      { label: 'Hearings', icon: faGavel, route: '/hearings', roles: [] },
      { label: 'Documents', icon: faFileAlt, route: '/documents', roles: [] },
      { label: 'Calendar', icon: faCalendarAlt, route: '/calendar', roles: [] },
      { label: 'Reports', icon: faChartBar, route: '/reports', roles: [] },
      { label: 'Settings', icon: faCog, route: '/settings', roles: [] },
    ],
    lawyer: [
      { label: 'Dashboard', icon: faHome, route: '/dashboard', roles: [] },
      { label: 'My Cases', icon: faBriefcase, route: '/cases', roles: [] },
      { label: 'Clients', icon: faUser, route: '/clients', roles: [] },
      { label: 'Hearings', icon: faGavel, route: '/hearings', roles: [] },
      { label: 'Documents', icon: faFileAlt, route: '/documents', roles: [] },
      { label: 'Calendar', icon: faCalendarAlt, route: '/calendar', roles: [] },
      { label: 'Settings', icon: faCog, route: '/settings', roles: [] },
    ],
    client: [
      { label: 'Dashboard', icon: faHome, route: '/dashboard', roles: [] },
      { label: 'My Cases', icon: faBriefcase, route: '/cases', roles: [] },
      { label: 'Documents', icon: faFileAlt, route: '/documents', roles: [] },
      { label: 'Settings', icon: faCog, route: '/settings', roles: [] },
    ]
  };


  filteredNavItems: NavItem[] = [];
  faSignOutAlt = faSignOutAlt;

  private userSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      if (user) {
        this.role = user.role;
        this.username = user.username;
        this.filteredNavItems = this.navItemsByRole[this.role.toLowerCase()] || [];
      } else {
        this.filteredNavItems = [];
      }
    });
  }


  // getRoleDisplayName() {
  //   return {
  //     this.role;
  //   }
  // }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout(); // Make sure your AuthService has this
  }

}
