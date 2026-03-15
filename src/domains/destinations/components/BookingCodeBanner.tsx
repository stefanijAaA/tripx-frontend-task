'use client';

import { FC } from 'react';
import { DestinationCodeBannerProps } from '../types';

export const BookingCodeBanner: FC<DestinationCodeBannerProps> = ({
  bookingCode,
}) => {
  if (!bookingCode) {
    return null;
  }

  return (
    <div className='inline-flex w-fit items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-800'>
      Booking code: {bookingCode}
    </div>
  );
};
