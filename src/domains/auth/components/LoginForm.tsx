'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/src/components';
import { login, LoginServiceError } from '@/src/services';
import { LoginFormValues } from '../types';
import { loginSchema } from '../validation/schema';
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
    getValues,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      bookingCode: '',
    },
    mode: 'onSubmit',
  });

  const loginMutation = useMutation({
    mutationFn: login,
    retry: false,
    onSuccess: () => {
      setFailedAttempts(0);
      setLockoutRemaining(0);
      setFormError('');

      const { bookingCode } = getValues();

      if (bookingCode) {
        sessionStorage.setItem('bookingCode', bookingCode);
      } else {
        sessionStorage.removeItem('bookingCode');
      }

      router.push('/destinations');
      router.refresh();
    },
    onError: (error: LoginServiceError) => {
      const shouldCountAsFailedAttempt = isCountableFailure(error.errorType);

      if (shouldCountAsFailedAttempt) {
        const nextFailedAttempts = failedAttempts + 1;

        if (nextFailedAttempts >= MAX_FAILED_ATTEMPTS) {
          setFailedAttempts(MAX_FAILED_ATTEMPTS);
          setLockoutRemaining(LOCKOUT_DURATION_SECONDS);
          setFormError(
            `Too many failed attempts. Please wait ${LOCKOUT_DURATION_SECONDS} seconds and try again.`,
          );
          return;
        }

        setFailedAttempts(nextFailedAttempts);
        setFormError(error.message);
        return;
      }

      setFormError(error.message);
    },
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

  const onSubmit = (values: LoginFormValues) => {
    if (isLocked) {
      return;
    }

    setFormError('');

    loginMutation.mutate({
      username: values.username,
      password: values.password,
    });
  };

  const isSubmitting = loginMutation.isPending;

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
        className='w-full cursor-pointer rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-70'
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
