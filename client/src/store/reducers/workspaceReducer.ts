interface WorkspaceState {
  allWorkSpaces: any[];
  selectedWorkspace: any | null;
}

const initialState: WorkspaceState = {
  allWorkSpaces: [],
  selectedWorkspace: null,
};

export const workspaceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_WORKSPACE':
      return { ...state, selectedWorkspace: action.payload };
    case 'ALL_WORKSPACES':
      return { ...state, allWorkSpaces: action.payload };
    default:
      return state;
  }
};

export default workspaceReducer;
