import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DestinationsPage } from '@/src/domains';
import { verifySessionToken } from '@/src/lib/session';

export default async function Destinations() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    redirect('/login');
  }

  try {
    await verifySessionToken(session);
  } catch {
    redirect('/login');
  }

  return <DestinationsPage />;
}
