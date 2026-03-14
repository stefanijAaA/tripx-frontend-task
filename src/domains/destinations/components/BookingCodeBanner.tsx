'use client';

export const BookingCodeBanner = () => {
  const bookingCode =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('bookingCode')
      : null;

  if (!bookingCode) {
    return null;
  }

  return (
    <div className='inline-flex w-fit items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-800'>
      Booking code: {bookingCode}
    </div>
  );
};
