import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
  Update,
} from '@ngrx/entity';
import { DemoItem } from '../../demo-item.model';
import { DemosActions, DemosActionTypes } from '../actions/demos.actions';

// State

export const demosFeatureKey = 'demos';

// internal entity structure
// interface EntityState<T> {
//   ids: string[];
//   entities: { [id: string]: T };
// }

export interface DemoState extends EntityState<DemoItem> {
  selected: DemoItem;
  filter: string;
  editorVisible: boolean;
}

export const demosAdapter: EntityAdapter<DemoItem> =
  createEntityAdapter<DemoItem>();

export const defaultDemoItemState: DemoState = {
  // entity adapter
  ids: [],
  entities: {},
  // props
  editorVisible: false,
  filter: '',
  selected: {
    id: 0,
    title: '',
    component: '',
    sortOrder: 0,
    visible: true,
    url: '',
    topicid: 1,
  },
};

export const initialState = demosAdapter.getInitialState(defaultDemoItemState);

// Reducer

export function DemosReducer(
  state: DemoState = initialState,
  action: DemosActions
): DemoState {
  switch (action.type) {
    case DemosActionTypes.LoadDemosSuccess: {
      return demosAdapter.setAll(action.payload, {
        ...state,
      });
    }
    case DemosActionTypes.LoadDemosError: {
      return { ...state };
    }
    case DemosActionTypes.DeleteDemoSuccess: {
      const deleted: DemoItem = action.payload;
      return demosAdapter.removeOne(deleted.id, { ...state });
    }
    case DemosActionTypes.DeleteDemoError: {
      return { ...state };
    }
    case DemosActionTypes.ToggleEditor: {
      return { ...state, editorVisible: !state.editorVisible };
    }
    case DemosActionTypes.SetSelected: {
      return { ...state, selected: action.payload as DemoItem };
    }
    case DemosActionTypes.ApplyFilter: {
      return { ...state, filter: action.payload };
    }
    case DemosActionTypes.ToggleVisiblity: {
      const item: Update<DemoItem> = {
        id: action.payload.id,
        changes: { visible: action.payload.visible },
      };
      return demosAdapter.updateOne(item, { ...state });
    }
    default:
      return state;
  }
}
