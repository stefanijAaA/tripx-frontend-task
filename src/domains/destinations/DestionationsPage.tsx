'use client';

import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDestinations } from '@/src/services';
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

  const {
    data: destinations = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['destinations'],
    queryFn: getDestinations,
    select: mapDestinationsToListItems,
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
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-semibold tracking-tight text-slate-900'>
            Destinations
          </h1>

          {bookingCode && <BookingCodeBanner bookingCode={bookingCode} />}
        </div>

        {!isPending && !isError && destinations.length > 0 && (
          <div className='w-full max-w-md'>
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
    </main>
  );
};
