import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  @Input() role: 'admin' | 'lawyer' | 'client' = 'client';
  @Input() username: string = 'User';
}