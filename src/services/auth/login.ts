import axios from 'axios';
import { apiClient } from '../utils/client';
import { LoginPayload, LoginServiceError } from './types';
import { AUTH_ERRORS } from './utils/constants';
import { createApiHandler } from '../utils';

export const login = createApiHandler(
  async (payload: LoginPayload): Promise<void> => {
    try {
      await apiClient.post('/api/login', payload);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;

          if (status === 400) {
            throw {
              errorType: 'INVALID_CREDENTIALS',
              message: AUTH_ERRORS.INVALID_CREDENTIALS,
            } satisfies LoginServiceError;
          }

          if (status >= 500) {
            throw {
              errorType: 'SERVER_ERROR',
              message: AUTH_ERRORS.SERVER_ERROR,
            } satisfies LoginServiceError;
          }
        }

        if (error.request) {
          throw {
            errorType: 'NETWORK_ERROR',
            message: AUTH_ERRORS.GENERIC_ERROR,
          } satisfies LoginServiceError;
        }
      }

      throw {
        errorType: 'UNKNOWN_ERROR',
        message: AUTH_ERRORS.GENERIC_ERROR,
      } satisfies LoginServiceError;
    }
  },
  ['login'],
);
