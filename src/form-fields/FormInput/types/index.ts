import { InputProps } from '@/src/components';
import { FieldValues, Path } from 'react-hook-form';

export type FormInputProps<T extends FieldValues> = Omit<
  InputProps,
  'id' | 'error'
> & {
  name: Path<T>;
};
