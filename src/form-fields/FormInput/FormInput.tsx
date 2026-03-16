'use client';

import { FieldValues, useFormContext } from 'react-hook-form';
import { Input } from '@/src/components';
import { FormInputProps } from './types';

export const FormInput = <T extends FieldValues>({
  name,
  ...props
}: FormInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message?.toString();

  return <Input id={name} error={error} {...register(name)} {...props} />;
};
