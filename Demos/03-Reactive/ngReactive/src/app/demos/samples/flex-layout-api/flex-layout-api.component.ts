import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-flex-layout-api',
  templateUrl: './flex-layout-api.component.html',
  styleUrls: ['./flex-layout-api.component.scss'],
})
export class FlexLayoutApiComponent implements OnInit, OnDestroy {
  constructor(private obsMedia: MediaObserver) {}

  sub: SubSink = new SubSink();

  mq: string;
  isPhone: boolean;
  isTablet: boolean;

  ngOnInit() {
    this.subscribeScreen();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log('Subscription unsubscribed');
  }

  subscribeScreen() {
    this.sub.sink = this.obsMedia
      .asObservable()
      .pipe(
        tap((changes) => console.log(changes)),
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        this.mq = change.mqAlias;
        switch (change.mqAlias) {
          case 'xs':
            this.isPhone = true;
            this.isTablet = false;
            break;
          case 'sm':
            this.isPhone = false;
            this.isTablet = true;
            break;
          default:
            this.isPhone = false;
            this.isTablet = false;
            break;
        }
      });
  }

  getClass() {
    return this.isPhone ? 'phoneClass' : 'notPhoneClass';
  }
}
