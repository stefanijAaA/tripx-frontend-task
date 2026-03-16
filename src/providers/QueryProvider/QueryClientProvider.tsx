'use client';

import { FC } from 'react';
import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { ProvidersProps } from './types';

const queryClient = new QueryClient();
export const QueryClientProvider: FC<ProvidersProps> = ({ children }) => {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
};
