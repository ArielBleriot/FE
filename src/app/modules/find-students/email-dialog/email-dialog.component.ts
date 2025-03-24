import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';

interface EmailDto {
  from?: string;
  to: string;
  subject: string;
  body: string;
}

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  styles: [`
    :host ::ng-deep {
      .p-dialog-custom {
        .p-dialog-header {
          padding: 1.5rem 1.5rem 1rem;
          border-bottom: 1px solid var(--surface-border);
        }
        .p-dialog-content {
          padding: 1.5rem 1.5rem 1.5rem;
        }
        .p-dialog-footer {
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid var(--surface-border);
        }
        .p-inputtext {
          padding: 0.75rem;
        }
        .p-inputtextarea {
          resize: vertical;
        }
      }
    }
  `]
})
export class EmailDialogComponent {
  @Input() visible: boolean = false;
  @Input() recipientEmail: string = '';
  @Input() recipientName: string = '';
  @Input() senderEmail: string = localStorage.getItem('email')!;
  @Output() visibleChange = new EventEmitter<boolean>();

  emailData: EmailDto = {
    to: '',
    subject: '',
    body: ''
  };

  isSending: boolean = false;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnChanges() {
    if (this.visible) {
      this.emailData = {
        to: this.recipientEmail,
        subject: 'Connection Request from BridgeRTU',
        body: `Hi ${this.recipientName},

A student from ${localStorage.getItem('universityName')} would like to connect with you.

Contact Email: ${localStorage.getItem('email')}

You can reply directly to their email address to start the conversation.

Best regards,
BridgeRTU Team`
      };
    }
  }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  resetForm() {
    this.emailData = {
      to: '',
      subject: '',
      body: ''
    };
    this.isSending = false;
  }

  sendEmail() {
    if (!this.emailData.subject || !this.emailData.body) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields'
      });
      return;
    }

    this.isSending = true;

    this.apiService.sendEmail(this.emailData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Email sent successfully'
        });
        this.hideDialog();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to send email. Please try again.'
        });
        this.isSending = false;
      }
    });
  }
}
