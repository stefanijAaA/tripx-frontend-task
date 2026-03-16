import { apiClient } from '../utils/client';

export const logout = async (): Promise<void> => {
  await apiClient.post('/api/logout');
};
