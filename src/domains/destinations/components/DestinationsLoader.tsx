export const DestinationsLoader = () => {
  return (
    <div className='space-y-6'>
      <div className='h-11 w-full max-w-md animate-pulse rounded-xl bg-slate-200' />

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className='h-52 animate-pulse rounded-2xl bg-slate-200'
          />
        ))}
      </div>
    </div>
  );
};
