import { DestinationsListProps } from '../types';
import { DestinationCard } from './DestinationCard';

export const DestinationsList = ({ destinations }: DestinationsListProps) => {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {destinations.map((destination) => (
        <DestinationCard key={destination.code} destination={destination} />
      ))}
    </div>
  );
};
