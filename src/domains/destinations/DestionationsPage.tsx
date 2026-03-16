'use client';

import { FC, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getDestinations, logout } from '@/src/services';
import {
  BookingCodeBanner,
  DestinationsList,
  DestinationsLoader,
} from './components';
import { filterDestinations, mapDestinationsToListItems } from './utils';
import { Search } from '@/src/components';
import { DestinationPageProps } from './types';

export const DestinationsPage: FC<DestinationPageProps> = ({ bookingCode }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const {
    data: destinations = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['destinations'],
    queryFn: getDestinations,
    select: mapDestinationsToListItems,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push('/login');
      router.refresh();
    },
  });

  const filteredDestinations = filterDestinations(destinations, search);

  const showBackendEmptyState =
    !isPending && !isError && destinations.length === 0;

  const showSearchEmptyState =
    !isPending &&
    !isError &&
    destinations.length > 0 &&
    filteredDestinations.length === 0;

  return (
    <main className='min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
        <section className='flex flex-col gap-3'>
          <div className='flex justify-between gap-3'>
            <h1 className='w-full text-3xl font-semibold tracking-tight text-slate-900'>
              Destinations
            </h1>

            <button
              type='button'
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              aria-label='Logout'
              className='inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-medium text-sky-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70'
            >
              <LogOut size={20} />
              <span className='hidden [@media(min-width:1024px)]:inline'>
                Logout
              </span>
            </button>
          </div>

          {bookingCode ? <BookingCodeBanner bookingCode={bookingCode} /> : null}
        </section>

        <div className='flex flex-col gap-8'>
          {!isPending && !isError && destinations.length > 0 && (
            <div className='flex w-full max-w-md'>
              <Search
                value={search}
                onChange={setSearch}
                placeholder='Find your dream destination'
              />
            </div>
          )}

          {isPending && <DestinationsLoader />}

          {isError && (
            <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              Failed to load destinations.
            </div>
          )}

          {showBackendEmptyState && (
            <div className='rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm'>
              No destinations available.
            </div>
          )}

          {showSearchEmptyState && (
            <div className='text-sm text-slate-600'>
              Sorry, no destinations match your search. Try a different name,
              country or alias.
            </div>
          )}

          {!isPending && !isError && filteredDestinations.length > 0 && (
            <DestinationsList destinations={filteredDestinations} />
          )}
        </div>
      </div>
    </main>
  );
};
