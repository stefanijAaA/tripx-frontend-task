import { DestinationsPage } from '@/src/domains';
import { requireAuthenticatedUser } from '@/src/lib/auth';

export default async function Destinations() {
  await requireAuthenticatedUser();

  return <DestinationsPage />;
}
