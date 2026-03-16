import { createApiHandler } from '../utils';
import { apiClient } from '../utils/client';
import { DestinationsResponse } from './types';

export const getDestinations =
  createApiHandler(async (): Promise<DestinationsResponse> => {
    const { data } =
      await apiClient.get<DestinationsResponse>('/api/destinations');
    return data;
  }, ['destinations']);
