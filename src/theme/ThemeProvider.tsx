import { FunctionComponent, PropsWithChildren, useState, useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import LIGHT_THEME from './light';

const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  if (loading) return null;

  return (
    <EmotionThemeProvider theme={createTheme(LIGHT_THEME)}>
      <CssBaseline />
      {children}
    </EmotionThemeProvider>
  );
};

export default AppThemeProvider;
