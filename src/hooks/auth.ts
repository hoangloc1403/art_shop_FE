import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { IS_FAKE_LOGIN } from '@/config';
import { sessionStorageDelete, sessionStorageGet } from '@/utils/sessionStorage';
import { jwtDecode, JwtPayload } from 'jwt-decode';

type CurrentUser = {
  id?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  name?: string;
};

/**
 * Hook to get currently logged user
 * @returns {object | undefined} user data as object or undefined if user is not logged in
 */
export function useCurrentUser(): CurrentUser | undefined {
  const [state] = useAppStore();
  return state.currentUser as CurrentUser;
}

/**
 * Hook to detect is current user authenticated or not
 * @returns {boolean} true if user is authenticated, false otherwise
 */
export function useIsAuthenticated() {
  const [state] = useAppStore();
  const result = IS_FAKE_LOGIN ? true : state.isAuthenticated;

  // TODO: AUTH: add access token verification or other authentication check here
  // result = Boolean(sessionStorageGet('access_token', ''));

  return result;
}

/**
 * Custom hook to decode JWT and return user role
 * @returns {number | null} Role number (e.g. 3) or null if not available
 */
export function useUserRoleFromToken(): number | null {
  // const token = localStorage.getItem('access_token');
  const token = sessionStorageGet('access_token');

  const role = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode<JwtPayload>(token as string);
      return decoded?.role ?? null;
    } catch (err) {
      console.error('Failed to decode token:', err);
      return null;
    }
  }, [token]);

  return role;
}

/**
 * Returns event handler to Logout current user
 * @returns {function} calling this event logs out current user
 */
export function useEventLogout() {
  const navigate = useNavigate();
  const [, dispatch] = useAppStore();

  return useCallback(() => {
    // TODO: AUTH: add auth and tokens cleanup here
    sessionStorageDelete('access_token');
    sessionStorageDelete('avatar_url');
    sessionStorageDelete('fullName');

    dispatch({ type: 'LOG_OUT' });
    navigate('/', { replace: true }); // Redirect to home page by reloading the App
  }, [dispatch, navigate]);
}

/**
 * Adds watchdog and calls different callbacks on user login and logout
 * @param {function} afterLogin callback to call after user login
 * @param {function} afterLogout callback to call after user logout
 */
export function useAuthWatchdog(afterLogin: () => void, afterLogout: () => void) {
  const [state, dispatch] = useAppStore();

  useEffect(() => {
    if (state.isAuthenticated) {
      afterLogin?.();
    } else {
      afterLogout?.();
    }
  }, [state.isAuthenticated, dispatch, afterLogin, afterLogout]);
}
