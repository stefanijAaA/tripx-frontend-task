import { forwardRef } from 'react';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, labelSuffix, error, className = '', rightElement, ...props },
    ref,
  ) => {
    return (
      <div>
        <div className='mb-2 flex items-center gap-1'>
          <label
            htmlFor={id}
            className='block text-sm font-medium text-slate-700'
          >
            {label}
          </label>

          {labelSuffix ? (
            <span className='text-sm text-slate-400'>{labelSuffix}</span>
          ) : null}
        </div>

        <div className='relative'>
          <input
            ref={ref}
            id={id}
            aria-invalid={Boolean(error)}
            className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'
            } ${rightElement ? 'pr-12' : ''} ${className}`}
            {...props}
          />

          {rightElement ? (
            <div className='absolute inset-y-0 right-0 flex items-center pr-4'>
              {rightElement}
            </div>
          ) : null}
        </div>

        {error ? <p className='mt-1 text-xs text-red-600'>{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
