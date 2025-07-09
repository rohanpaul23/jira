import { Reducer } from 'redux';


export interface Workspace {
  _id: string;
  name: string;
  description?: string;
  owner: { _id: string; email: string };
  members: { user: { _id: string; email: string }; role: string }[];
  createdAt: string;
  updatedAt: string;
}


// Action types
export const FETCH_WORKSPACES_REQUEST = 'FETCH_WORKSPACES_REQUEST';
export const FETCH_WORKSPACES_SUCCESS = 'FETCH_WORKSPACES_SUCCESS';
export const FETCH_WORKSPACES_FAILURE = 'FETCH_WORKSPACES_FAILURE';

// State interface
export interface WorkspacesState {
  items: Workspace[];
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialWorkspacesState: WorkspacesState = {
  items: [],
  loading: false,
  error: null,
};

// Action interfaces
interface FetchRequestAction {
  type: typeof FETCH_WORKSPACES_REQUEST;
}
interface FetchSuccessAction {
  type: typeof FETCH_WORKSPACES_SUCCESS;
  payload: Workspace[];
}
interface FetchFailureAction {
  type: typeof FETCH_WORKSPACES_FAILURE;
  payload: string;
}

type WorkspacesActionTypes =
  | FetchRequestAction
  | FetchSuccessAction
  | FetchFailureAction;

// Reducer
export const workspaceReducer: Reducer<WorkspacesState, WorkspacesActionTypes> = (
  state = initialWorkspacesState,
  action
) => {
  switch (action.type) {
    case FETCH_WORKSPACES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_WORKSPACES_SUCCESS:
      return { items: action.payload, loading: false, error: null };
    case FETCH_WORKSPACES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Action creators
export const fetchWorkspacesRequest = (): FetchRequestAction => ({ type: FETCH_WORKSPACES_REQUEST });
export const fetchWorkspacesSuccess = (
  items: Workspace[]
): FetchSuccessAction => ({ type: FETCH_WORKSPACES_SUCCESS, payload: items });
export const fetchWorkspacesFailure = (
  error: string
): FetchFailureAction => ({ type: FETCH_WORKSPACES_FAILURE, payload: error });