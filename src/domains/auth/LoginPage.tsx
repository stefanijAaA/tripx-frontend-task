import { LoginForm } from './components';

export const LoginPage = () => {
  return (
    <main className='grid min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto flex w-full max-w-6xl items-center justify-center py-8'>
        <div className='grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.95fr_1.05fr]'>
          <div className='hidden bg-sky-100/70 p-10 lg:flex lg:flex-col lg:justify-center'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-sky-700'>
                TripX
              </p>

              <h1 className='mt-4 text-4xl font-semibold tracking-tight text-slate-900'>
                Welcome back
              </h1>

              <p className='mt-4 max-w-md text-base leading-7 text-slate-600'>
                Sign in to access your destinations.
              </p>
            </div>
          </div>

          <section className='flex items-center justify-center p-6 sm:p-8 lg:p-10'>
            <div className='w-full max-w-md'>
              <div className='mb-8'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 lg:hidden'>
                  TripX
                </p>

                <h2 className='mt-2 text-3xl font-semibold tracking-tight text-slate-900'>
                  Sign in
                </h2>
              </div>
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
