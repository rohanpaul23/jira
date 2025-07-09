import { createStore, combineReducers, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, AuthState } from './reducers/authReducer';
import { workspaceReducer, WorkspacesState } from './reducers/workspaceReducer';


// Root state interface
type RootState = {
  auth: AuthState;
  workspaces: WorkspacesState;
};


const isDevelopment = import.meta.env.MODE === 'development';


// Combine reducers
const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  workspaces: workspaceReducer,
});

// Create Redux store with DevTools enhancer (no-op if extension not installed)
export const store: Store<RootState> = isDevelopment
  ? createStore(
      rootReducer,
     composeWithDevTools()
    )
  : createStore(rootReducer);