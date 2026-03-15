import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginPage } from '@/src/domains';
import { verifySessionToken } from '@/src/lib/session';

export default async function LoginRoute() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    return <LoginPage />;
  }

  try {
    await verifySessionToken(session);
    redirect('/destinations');
  } catch {
    return <LoginPage />;
  }
}
