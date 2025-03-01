import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

}
