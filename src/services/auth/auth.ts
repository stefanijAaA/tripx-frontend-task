import axios from 'axios';
import { apiClient } from '../utils/client';
import { LoginPayload, LoginResult } from './types';
import { AUTH_ERRORS } from './utils/constants';

export const login = async (payload: LoginPayload): Promise<LoginResult> => {
  try {
    await apiClient.post('/api/login', payload);

    return {
      success: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          return {
            success: false,
            errorType: 'INVALID_CREDENTIALS',
            message: AUTH_ERRORS.INVALID_CREDENTIALS,
          };
        }

        if (status >= 500) {
          return {
            success: false,
            errorType: 'SERVER_ERROR',
            message: AUTH_ERRORS.SERVER_ERROR,
          };
        }
      }

      if (error.request) {
        return {
          success: false,
          errorType: 'NETWORK_ERROR',
          message: AUTH_ERRORS.GENERIC_ERROR,
        };
      }
    }

    return {
      success: false,
      errorType: 'UNKNOWN_ERROR',
      message: AUTH_ERRORS.GENERIC_ERROR,
    };
  }
};
