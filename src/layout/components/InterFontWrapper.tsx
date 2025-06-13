// src/components/InterFontWrapper.tsx

import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const interFontTheme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

type Props = {
  children: ReactNode;
};

const InterFontWrapper = ({ children }: Props) => {
  return <ThemeProvider theme={interFontTheme}>{children}</ThemeProvider>;
};

export default InterFontWrapper;
