import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { 
  faBell, faHome, faUser, faUsers, faGavel, 
  faFileAlt, faCalendarAlt, faChartBar, faCog, 
  faSignOutAlt, faBriefcase, faFolderOpen 
} from '@fortawesome/free-solid-svg-icons';

export function initializeFontAwesome(library: FaIconLibrary) {
  library.addIcons(
    faBell, faHome, faUser, faUsers, faGavel, 
    faFileAlt, faCalendarAlt, faChartBar, faCog, 
    faSignOutAlt, faBriefcase, faFolderOpen
  );
}