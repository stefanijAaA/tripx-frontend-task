'use client';

import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { Input } from '@/src/components';
import { FormInputProps } from './types';

export const FormInput = <T extends FieldValues>({
  name,
  ...props
}: FormInputProps<T>) => {
  const { control } = useFormContext<T>();

  const { field, fieldState } = useController({ name, control });

  const error = fieldState?.error?.message?.toString() ?? '';

  return <Input id={name} error={error} {...field} {...props} />;
};
