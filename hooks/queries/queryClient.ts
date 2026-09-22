import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: 2,
    },
    mutations: {
      retry: 0,
    },
  },
});
