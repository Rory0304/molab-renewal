"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { LazyMotion, domAnimation } from "framer-motion";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";

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
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        action={(snackbarKey) => (
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
