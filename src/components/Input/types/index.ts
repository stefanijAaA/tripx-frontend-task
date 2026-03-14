import { InputHTMLAttributes, ReactNode } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  labelSuffix?: ReactNode;
  error?: string;
};
