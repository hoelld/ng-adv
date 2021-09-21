import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoadDemos, ToggleEditor } from '../actions/demos.actions';
import { DemoState } from '../reducers/demos.reducer';
import { getAllDemos, getEditorVisible } from '../selectors/demo.selectors';

@Injectable({
  providedIn: 'root',
})
export class DemoFacade {
  constructor(private store: Store<DemoState>) {}

  initData() {
    this.store.dispatch(new LoadDemos());
  }

  getDemos() {
    return this.store
      .select(getAllDemos)
      .pipe(tap((data) => console.log('data received from store', data)));
  }

  toggleEditor() {
    this.store.dispatch(new ToggleEditor());
  }

  getEditorVisible() {
    return this.store.select(getEditorVisible);
  }
}
