import { ThemeProvider } from '@/theme';
import StoreProvider from '@/store';
import { ErrorBoundary } from '@/components';
import Routes from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './utils/snackbar';

/**
 * Root Application Component
 * @component MainApp
 */

const queryClient = new QueryClient();

const MainApp = () => {
  return (
    <ErrorBoundary name="App">
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <ThemeProvider>
            <SnackbarProvider maxSnack={3}>
              <SnackbarUtilsConfigurator />
              <Routes />
            </SnackbarProvider>
          </ThemeProvider>
        </StoreProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default MainApp;
