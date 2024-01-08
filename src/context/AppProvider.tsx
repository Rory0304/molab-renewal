'use client';

import React from 'react';

import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domAnimation } from 'framer-motion';
import { SnackbarProvider, closeSnackbar } from 'notistack';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 3,
            // globally default to 20 seconds
            staleTime: 1000 * 20,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        action={snackbarKey => (
          <button
            className="btn btn-circle btn-ghost btn-sm"
            onClick={() => closeSnackbar(snackbarKey)}
          >
            <XMarkIcon />
          </button>
        )}
      >
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
