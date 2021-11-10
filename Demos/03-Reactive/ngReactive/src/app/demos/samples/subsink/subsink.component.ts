import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-subsink',
  templateUrl: './subsink.component.html',
  styleUrls: ['./subsink.component.scss'],
})
export class SubsinkComponent implements OnInit, OnDestroy {
  @ViewChild('searchBox', { static: true }) searchBox: ElementRef;

  constructor() {}

  sub: SubSink = new SubSink();
  result: { X: number; Y: number } = { X: 0, Y: 0 };

  ngOnInit() {
    this.subscribeSearchBox();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log('Subscription unsubscribed');
  }

  subscribeSearchBox() {
    this.sub.sink = fromEvent(this.searchBox.nativeElement, 'keyup').subscribe(
      (ke: KeyboardEvent) => {
        console.log('Event received from Keyboard:', ke);
      }
    );
  }
}
