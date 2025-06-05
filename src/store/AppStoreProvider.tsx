import { FunctionComponent, PropsWithChildren, useReducer, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { localStorageGet } from '@/utils/localStorage';
import { sessionStorageGet, sessionStorageSet } from '@/utils/sessionStorage'; // Thêm dòng này
import { AppStoreContext } from './AppStore';
import AppStoreReducer from './AppStoreReducer';
import { AppStoreState, INITIAL_APP_STORE_STATE } from './config';
import { userService } from '@/services';

const loadToken = () => sessionStorageGet('access_token'); // Định nghĩa hàm này

const AppStoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const previousDarkMode = Boolean(localStorageGet('darkMode'));
  const token = loadToken();
  const tokenExists = Boolean(token);

  const initialState: AppStoreState = {
    ...INITIAL_APP_STORE_STATE,
    darkMode: previousDarkMode || prefersDarkMode,
    isAuthenticated: tokenExists,
    currentUser: null, // Ban đầu chưa có user
  };

  const [state, dispatch] = useReducer(AppStoreReducer, initialState);

  // Khi app load, kiểm tra token và lấy user nếu có
  useEffect(() => {
    const checkAuth = async () => {
      if (tokenExists) {
        try {
          const user = await userService.getProfile();
          sessionStorageSet('avatar_url', user.avatarUrl);
          sessionStorageSet('fullName', user.fullName);
          dispatch({ type: 'LOG_IN', payload: user });
        } catch (error) {
          console.error('Token invalid, logging out', error);
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('avatar_url');
          sessionStorage.removeItem('fullName');
          dispatch({ type: 'LOG_OUT' });
        }
      }
    };

    checkAuth();
  }, [tokenExists, token]);

  return <AppStoreContext.Provider value={[state, dispatch]}>{children}</AppStoreContext.Provider>;
};

export default AppStoreProvider;
