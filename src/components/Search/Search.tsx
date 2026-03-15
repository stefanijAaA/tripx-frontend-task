'use client';

import { FC } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { SearchProps } from './types';

export const Search: FC<SearchProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  return (
    <div className='flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm cursor-text overflow-hidden'>
      <SearchIcon
        size={20}
        className='h-5 w-5 shrink-0 text-slate-400 pointer-events-none'
      />

      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className='w-full min-w-0 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50'
      />
    </div>
  );
};
