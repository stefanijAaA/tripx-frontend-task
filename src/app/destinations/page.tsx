import { cookies } from 'next/headers';
import { DestinationsPage } from '@/src/domains';
import { requireAuthenticatedUser } from '@/src/lib/auth';

export default async function Destinations() {
  await requireAuthenticatedUser();

  const cookieStore = await cookies();
  const bookingCode = cookieStore.get('bookingCode')?.value;

  return <DestinationsPage bookingCode={bookingCode} />;
}
