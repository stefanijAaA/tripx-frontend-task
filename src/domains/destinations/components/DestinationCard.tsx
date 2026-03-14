import Image from 'next/image';
import { DestinationCardProps } from '../types';

export const DestinationCard = ({ destination }: DestinationCardProps) => {
  const imageSrc = destination.thumbnail ?? destination.countryThumbnail;

  return (
    <article className='group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
      <div className='relative h-52 w-full bg-slate-100 overflow-hidden'>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={destination.name}
            fill
            className='object-cover transition duration-500 group-hover:scale-105'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center px-4 text-center text-sm font-medium text-slate-500'>
            No image available
          </div>
        )}
      </div>

      <div className='p-4'>
        <h2 className='text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-700'>
          {destination.name}
        </h2>
      </div>
    </article>
  );
};
