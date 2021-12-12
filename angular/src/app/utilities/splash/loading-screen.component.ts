import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingScreenService } from './loading-screen.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit , OnDestroy {
    loading: Boolean = false;
    loadingSubscription: Subscription;

    constructor(private loadingScreenService: LoadingScreenService) {
    }

    ngOnInit() {
      this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
        this.loading = value;
      });
    }

    ngOnDestroy() {
      this.loadingSubscription.unsubscribe();
    }
}
