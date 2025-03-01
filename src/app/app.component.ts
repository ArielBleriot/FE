import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './modules/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SpinnerComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'BridgeRTU';
}
