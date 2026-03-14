'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/src/components';
import { LoginFormValues } from '../types';
import { loginSchema } from '../validation/schema';
import { login } from '@/src/services';
import {
  MAX_FAILED_ATTEMPTS,
  LOCKOUT_DURATION_SECONDS,
} from '../utils/constants';
import { isCountableFailure } from '../utils/helpers';

export const LoginForm = () => {
  const router = useRouter();

  const [formError, setFormError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  const isLocked = lockoutRemaining > 0;

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

  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const interval = setInterval(() => {
      setLockoutRemaining((previousValue) => {
        if (previousValue <= 1) {
          clearInterval(interval);
          setFailedAttempts(0);
          setFormError('');
          return 0;
        }

        return previousValue - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLocked]);

  const onSubmit = async (values: LoginFormValues) => {
    if (isLocked) {
      return;
    }

    setFormError('');

    const result = await login({
      username: values.username,
      password: values.password,
    });

    if (!result.success) {
      const shouldCountAsFailedAttempt = isCountableFailure(result.errorType);

      if (shouldCountAsFailedAttempt) {
        const nextFailedAttempts = failedAttempts + 1;

        if (nextFailedAttempts >= MAX_FAILED_ATTEMPTS) {
          setFailedAttempts(MAX_FAILED_ATTEMPTS);
          setLockoutRemaining(LOCKOUT_DURATION_SECONDS);
          setFormError(
            `Too many failed attempts. Please wait ${LOCKOUT_DURATION_SECONDS} seconds before trying again.`,
          );
          return;
        }

        setFailedAttempts(nextFailedAttempts);
      }

      setFormError(result.message);
      return;
    }

    setFailedAttempts(0);
    setLockoutRemaining(0);
    setFormError('');

    if (values.bookingCode) {
      sessionStorage.setItem('bookingCode', values.bookingCode);
    } else {
      sessionStorage.removeItem('bookingCode');
    }

    router.push('/destinations');
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
        disabled={isSubmitting || isLocked}
        {...register('username')}
      />

      <Input
        id='password'
        type='password'
        label='Password'
        placeholder='Enter your password'
        error={errors.password?.message}
        disabled={isSubmitting || isLocked}
        {...register('password')}
      />

      <Input
        id='bookingCode'
        type='text'
        label='Booking code'
        labelSuffix='(optional)'
        placeholder='Enter booking code'
        error={errors.bookingCode?.message}
        disabled={isSubmitting || isLocked}
        {...register('bookingCode')}
      />

      <button
        type='submit'
        disabled={isSubmitting || isLocked}
        className='w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer'
      >
        {isSubmitting
          ? 'Signing in...'
          : isLocked
            ? `Try again in ${lockoutRemaining}s`
            : 'Sign in'}
      </button>
    </form>
  );
};
