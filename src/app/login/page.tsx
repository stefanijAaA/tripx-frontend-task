import { redirectIfAuthenticated } from '@/src/lib';
import { LoginPage } from '@/src/domains';

export default async function LoginRoute() {
  await redirectIfAuthenticated();

  return <LoginPage />;
}
