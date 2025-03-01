import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { map, Observable } from 'rxjs';
@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule,FormsModule,AccordionModule, AvatarModule, BadgeModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  isChatOpen: boolean = false;
  userMessage: string = '';
  messages: any[] = [];
  apiKey: string = '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'; // Replace with your OpenAI API key

  constructor(private http: HttpClient) {}

  openChat() {
    this.isChatOpen = true;
  }

  closeChat() {
    this.isChatOpen = false;
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Add the user's message to the chat
    this.messages.push({ role: 'user', content: this.userMessage });
    const userMessage = this.userMessage;
    this.userMessage = '';

    // Send message to OpenAI API
    this.getAIResponse(userMessage).subscribe(response => {
      // Add AI's response to the chat
      this.messages.push({ role: 'assistant', content: response });
    });
  }

  getAIResponse(userMessage: string): Observable<string> {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-4', // You can use gpt-4 or any other available model
      messages: [
        { role: 'user', content: userMessage }
      ]
    };

    return this.http.post<any>(url, body, { headers })
      .pipe(
        map(response => response.choices[0]?.message?.content || '')
      );
  }
}
