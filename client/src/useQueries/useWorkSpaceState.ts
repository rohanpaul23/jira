import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

/**
 * Hook to select workspaces state from Redux store.
 * Returns:
 * - workspaces: array of workspace items
 * - loading: boolean loading flag
 * - error: error message or null
 */
export function useWorkspacesState() {
  const { items, loading, error } = useSelector(
    (state: RootState) => state.workspaces,
  );
  return { workspaces: items, loading, error };
}
