import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() title: string = 'Legal Case Management & Documentation System';
  faBell = faBell;
  notifications = [
    { id: 1, message: 'New case assigned', time: '2 hours ago', read: false },
    { id: 2, message: 'Document approved', time: '1 day ago', read: true }
  ];
  unreadCount = this.notifications.filter(n => !n.read).length;
  showNotifications = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(id: number) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      notification.read = true;
      this.unreadCount--;
    }
  }
}