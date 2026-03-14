import { Input } from '@/src/components';

export function LoginForm() {
  return (
    <div className='space-y-5'>
      <Input
        id='username'
        name='username'
        type='text'
        label='Username'
        placeholder='Enter your username'
      />

      <Input
        id='password'
        name='password'
        type='password'
        label='Password'
        placeholder='Enter your password'
      />

      <Input
        id='bookingCode'
        name='bookingCode'
        type='text'
        label='Booking code'
        labelSuffix='(optional)'
        placeholder='Enter booking code'
      />

      <button
        type='button'
        className='w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200'
      >
        Sign in
      </button>
    </div>
  );
}
