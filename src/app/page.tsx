import { getSessionPayload } from '@/src/lib';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getSessionPayload();

  redirect(session ? '/destinations' : '/login');
}
