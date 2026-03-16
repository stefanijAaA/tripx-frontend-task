import { InputHTMLAttributes, ReactNode } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  labelSuffix?: string;
  error?: string;
  rightElement?: ReactNode;
};
