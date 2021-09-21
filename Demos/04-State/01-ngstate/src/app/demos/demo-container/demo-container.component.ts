import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { EventBusService } from 'src/app/shared/eventbus/event-bus.service';
import { SidebarActions } from 'src/app/shared/sidebar/sidebar-actions';
import { MenuFacade } from 'src/app/store/facades/menu.facade';
import { environment } from 'src/environments/environment';
import { DemoItem } from '../demo-item.model';
import { DemoFacade } from '../store/facades/demo.facade';

@Component({
  selector: 'app-demo-container',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.scss'],
})
export class DemoContainerComponent implements OnInit {
  constructor(
    public mf: MenuFacade,
    private router: Router,
    private df: DemoFacade,
    private eb: EventBusService
  ) {}

  title: string = environment.title;
  header = 'Please select a demo';

  demos$ = this.df.getDemos();
  current: DemoItem = this.demos$ != null ? this.demos$[0] : null;
  menuVisible$ = this.mf.sideNavVisible;
  menuPosition$ = this.mf.sideNavPosition;
  // showEditor$ = this.eb.Commands.pipe(
  //   map((action) => (action === SidebarActions.HIDE_MARKDOWN ? false : true))
  // );
  showEditor$ = this.df.getEditorVisible();

  ngOnInit() {
    this.df.initData();
    this.setMetadata();
    this.getWorbenchStyle();
  }

  getWorbenchStyle() {
    let result = {};
    this.mf.sideNavVisible.subscribe((visible) => {
      result = visible
        ? {
            'margin-left': '10px',
          }
        : {};
    });
    return result;
  }

  private setMetadata() {
    this.router.events
      .pipe(
        filter((evt: Event) => evt instanceof NavigationEnd),
        mergeMap((evt: NavigationEnd) => {
          const childroute = evt.url.substr(evt.url.lastIndexOf('/') + 1);
          return this.demos$.pipe(
            map((items) => items.find((i) => i.url.includes(childroute)))
          );
        })
      )
      .subscribe((demo) => {
        this.header =
          demo != null
            ? `Demo: ${demo.title} - Component: ${demo.component}`
            : 'Please select a demo';
      });
  }
}
