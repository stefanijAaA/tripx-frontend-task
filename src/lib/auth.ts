import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySessionToken } from './session';

export const getSessionPayload = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    return null;
  }

  try {
    return await verifySessionToken(session);
  } catch {
    return null;
  }
};

export const requireAuthenticatedUser = async () => {
  const sessionPayload = await getSessionPayload();

  if (!sessionPayload) {
    redirect('/login');
  }

  return sessionPayload;
};

export const redirectIfAuthenticated = async () => {
  const sessionPayload = await getSessionPayload();

  if (sessionPayload) {
    redirect('/destinations');
  }

  return null;
};
