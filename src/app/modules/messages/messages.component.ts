import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface ChatUser {
  id: number;
  name: string;
  imageUrl?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  online?: boolean;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    ToastModule
  ],
  providers: [MessageService],
  styles: [`
    .messages-container {
      height: calc(100vh - 200px);
      min-height: 500px;
    }

    .chat-list {
      height: 100%;
      overflow-y: auto;
      border-right: 1px solid #e9ecef;
    }

    .chat-messages {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .messages-area {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .message-input-area {
      border-top: 1px solid #e9ecef;
      padding: 1rem;
      background: white;
    }

    .chat-user {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f8f9fa;
      }

      &.active {
        background-color: #e3f2fd;
      }
    }

    .message-bubble {
      max-width: 80%;
      padding: 0.75rem 1rem;
      border-radius: 1rem;
      margin-bottom: 1rem;

      &.sent {
        background-color: #e3f2fd;
        margin-left: auto;
        border-bottom-right-radius: 0.25rem;
      }

      &.received {
        background-color: #f8f9fa;
        margin-right: auto;
        border-bottom-left-radius: 0.25rem;
      }
    }

    .online-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #4caf50;
      display: inline-block;
      margin-right: 0.5rem;
    }

    .unread-badge {
      background-color: #2196F3;
      color: white;
      border-radius: 50%;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    .message-time {
      font-size: 0.75rem;
      color: #6c757d;
    }

    :host ::ng-deep {
      .p-tabview-nav {
        justify-content: center;
      }
    }
  `]
})
export class MessagesComponent implements OnInit {
  activeTab: number = 0;
  selectedUser: ChatUser | null = null;
  newMessage: string = '';
  messages: Message[] = [];
  chatUsers: ChatUser[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Simulated data - replace with actual API calls
    this.chatUsers = [
      {
        id: 1,
        name: 'John Doe',
        imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        lastMessage: 'Hey, are you interested in collaborating on a project?',
        lastMessageTime: new Date(),
        unreadCount: 2,
        online: true
      },
      {
        id: 2,
        name: 'Jane Smith',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        lastMessage: 'Thanks for your help!',
        lastMessageTime: new Date(Date.now() - 3600000),
        unreadCount: 0,
        online: false
      }
    ];

    this.messages = [
      {
        id: 1,
        senderId: 1,
        receiverId: 0,
        content: 'Hey, are you interested in collaborating on a project?',
        timestamp: new Date(),
        read: false
      },
      {
        id: 2,
        senderId: 0,
        receiverId: 1,
        content: 'Sure, what kind of project do you have in mind?',
        timestamp: new Date(Date.now() - 300000),
        read: true
      }
    ];
  }

  selectUser(user: ChatUser) {
    this.selectedUser = user;
    user.unreadCount = 0;
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedUser) return;

    const message: Message = {
      id: this.messages.length + 1,
      senderId: 0,
      receiverId: this.selectedUser.id,
      content: this.newMessage,
      timestamp: new Date(),
      read: true
    };

    this.messages.push(message);
    this.selectedUser.lastMessage = this.newMessage;
    this.selectedUser.lastMessageTime = new Date();
    this.newMessage = '';

    // Simulate received message
    setTimeout(() => {
      const response: Message = {
        id: this.messages.length + 1,
        senderId: this.selectedUser!.id,
        receiverId: 0,
        content: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date(),
        read: false
      };
      this.messages.push(response);
      this.selectedUser!.lastMessage = response.content;
      this.selectedUser!.lastMessageTime = response.timestamp;
    }, 1000);
  }

  isMessageSent(message: Message): boolean {
    return message.senderId === 0;
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
