import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Subscription } from 'rxjs';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnInit, OnDestroy {
  loading = false;
  subscription: Subscription|undefined;

  constructor(private loaderService: LoaderService, private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.loaderService.isLoading$.subscribe(loading => {
      this.loading = loading;
      this.cdref.detectChanges(); // Ensure Angular detects the change
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
