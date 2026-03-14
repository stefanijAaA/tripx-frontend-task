'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/src/components';
import { LoginFormValues } from '../types';
import { loginSchema } from '../validation/schema';
import { loginUser } from '../api/login';

export function LoginForm() {
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      bookingCode: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError('');

    const result = await loginUser(values);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    console.log('Login successful');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' noValidate>
      {formError ? (
        <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
          {formError}
        </div>
      ) : null}

      <Input
        id='username'
        type='text'
        label='Username'
        placeholder='Enter your username'
        error={errors.username?.message}
        {...register('username')}
      />

      <Input
        id='password'
        type='password'
        label='Password'
        placeholder='Enter your password'
        error={errors.password?.message}
        {...register('password')}
      />

      <Input
        id='bookingCode'
        type='text'
        label='Booking code'
        labelSuffix='(optional)'
        placeholder='Enter booking code'
        error={errors.bookingCode?.message}
        {...register('bookingCode')}
      />

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-70 hover: cursor-pointer'
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
