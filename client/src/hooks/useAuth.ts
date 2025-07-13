import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

/**
 * Hook to access auth state from Redux
 */
export const useAuth = () => {
  const { id, email, token } = useSelector((state: RootState) => state.auth);
  return {
    id,
    email,
    token,
    isAuthenticated: Boolean(token),
  };
};
