interface WorkspaceState {
  selectedWorkspace: any | null;
}

const initialState: WorkspaceState = {
  selectedWorkspace: null,
};

export const workspaceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_WORKSPACE':
      return { ...state, selectedWorkspace: action.payload };
    default:
      return state;
  }
};

export default workspaceReducer;