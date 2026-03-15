import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySessionToken } from '@/src/lib/session';

export default async function HomePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    redirect('/login');
  }

  try {
    await verifySessionToken(session);
    redirect('/destinations');
  } catch {
    redirect('/login');
  }
}
