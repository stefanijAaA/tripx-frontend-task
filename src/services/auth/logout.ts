import { createApiHandler } from '../utils';
import { apiClient } from '../utils/client';

export const logout = createApiHandler(async (): Promise<void> => {
  await apiClient.post('/api/logout');
}, ['logout']);
