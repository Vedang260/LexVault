import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faPaperPlane, 
  faComments,
  faUser,
  faEllipsisVertical,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { AuthService } from '../../services/auth.service';

interface ChatRoom {
  chatRoomId: string;
  caseId: string;
  memberIds: string[];
  createdAt: string;
  otherMember?: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

interface Message {
  messageId: string;
  chatRoomId: string;
  content: string;
  senderId: string;
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
  createdAt: string;
  isCurrentUser?: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() caseId: string = '';
  
  // Icons
  faPaperPlane = faPaperPlane;
  faComments = faComments;
  faUser = faUser;
  faEllipsisVertical = faEllipsisVertical;
  faClock = faClock;

  chatRooms: ChatRoom[] = [];
  selectedRoom: ChatRoom | null = null;
  messages: Message[] = [];
  newMessage = '';
  isLoading = true;
  isRoomLoading = false;
  currentUserId: string | null = null;
  socket!: Socket;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.fetchChatRooms();
    this.initSocketConnection();
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  initSocketConnection(): void {
    this.socket = io(environment.socketUrl, {
      auth: {
        token: this.authService.getToken()
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  fetchChatRooms(): void {
    this.isLoading = true;
    this.http.get<{success: boolean, chatRoom: ChatRoom[]}>(
      `https://api.yourdomain.com/cases/${this.caseId}/chat-rooms`
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.chatRooms = response.chatRoom.map(room => {
            // Find the other member (not current user)
            const otherMemberId = room.memberIds.find(id => id !== this.currentUserId);
            // In a real app, you'd fetch user details for otherMemberId
            return {
              ...room,
              otherMember: {
                id: otherMemberId || '',
                firstName: 'John', // Replace with actual fetched data
                lastName: 'Doe',
                role: 'CLIENT' // or 'LAWYER' etc.
              }
            };
          });
          
          if (this.chatRooms.length > 0) {
            this.selectRoom(this.chatRooms[0]);
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching chat rooms:', error);
        this.isLoading = false;
      }
    });
  }

  selectRoom(room: ChatRoom): void {
    this.selectedRoom = room;
    this.isRoomLoading = true;
    
    // Listen for new messages in this room
    if (this.socket) {
      this.socket.off(`newMessage-${room.chatRoomId}`); // Remove previous listener
      this.socket.on(`newMessage-${room.chatRoomId}`, (message: Message) => {
        this.handleNewMessage(message);
      });
    }

    this.fetchMessages(room.chatRoomId);
  }

  fetchMessages(chatRoomId: string): void {
    this.http.get<{success: boolean, messages: Message[]}>(
      `https://api.yourdomain.com/chat-rooms/${chatRoomId}/messages`
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.messages = response.messages.map(msg => ({
            ...msg,
            isCurrentUser: msg.senderId === this.currentUserId
          }));
        }
        this.isRoomLoading = false;
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
        this.isRoomLoading = false;
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.selectedRoom || !this.socket) return;

    const messageContent = this.newMessage.trim();
    this.newMessage = '';

    const dto = {
      chatRoomId: this.selectedRoom.chatRoomId,
      content: messageContent
    };

    this.socket.emit('sendMessage', dto, (response: Message) => {
      // This callback is optional, handles the server's response
      if (response) {
        this.handleNewMessage({
          ...response,
          isCurrentUser: true
        });
      }
    });
  }

  handleNewMessage(message: Message): void {
    // Only add if it's for the currently selected room
    if (this.selectedRoom && message.chatRoomId === this.selectedRoom.chatRoomId) {
      this.messages = [
        ...this.messages,
        {
          ...message,
          isCurrentUser: message.senderId === this.currentUserId
        }
      ];
      // Scroll to bottom
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
  }

  scrollToBottom(): void {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  formatTime(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  isSameDay(date1: string, date2: string): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }
}