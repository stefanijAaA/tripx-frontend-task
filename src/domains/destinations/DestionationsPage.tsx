'use client';

import { useQuery } from '@tanstack/react-query';
import { getDestinations } from '@/src/services';
import {
  BookingCodeBanner,
  DestinationsList,
  DestinationsLoader,
} from './components';
import { mapDestinationsToListItems } from './utils';

export const DestinationsPage = () => {
  const {
    data: destinations = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['destinations'],
    queryFn: getDestinations,
    select: mapDestinationsToListItems,
  });

  return (
    <main className='min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-semibold tracking-tight text-slate-900'>
            Destinations
          </h1>

          <BookingCodeBanner />
        </div>

        {isPending && <DestinationsLoader />}

        {isError && (
          <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
            Failed to load destinations.
          </div>
        )}

        {!isPending && !isError && destinations.length === 0 && (
          <div className='rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm'>
            No destinations found.
          </div>
        )}

        {!isPending && !isError && destinations.length > 0 && (
          <DestinationsList destinations={destinations} />
        )}
      </div>
    </main>
  );
};
