import { LoginRequestBody, LoginResult } from '../types';
import { LOGIN_ENDPOINT, AUTH_ERRORS } from '../utils/constants';

export async function loginUser(
  payload: LoginRequestBody,
): Promise<LoginResult> {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true };
    }

    if (response.status >= 500) {
      return {
        success: false,
        errorType: 'server_error',
        message: AUTH_ERRORS.SERVER_ERROR,
      };
    }

    return {
      success: false,
      errorType: 'invalid_credentials',
      message: AUTH_ERRORS.INVALID_CREDENTIALS,
    };
  } catch {
    return {
      success: false,
      errorType: 'network_error',
      message: AUTH_ERRORS.GENERIC_ERROR,
    };
  }
}
