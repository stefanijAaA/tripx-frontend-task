import { Destination } from '@/src/services';
import { DestinationListItem } from '../types';

export const mapDestinationsToListItems = (
  destinations: Destination[],
): DestinationListItem[] => {
  return destinations.flatMap((country) =>
    country.destinations.map((subDestination) => ({
      countryName: country.name,
      countrySlug: country.slug,
      countryCode: country.code,
      countryThumbnail: country.thumbnail,
      name: subDestination.name,
      slug: subDestination.slug,
      code: subDestination.code,
      thumbnail: subDestination.thumbnail,
      countHotels: subDestination.countHotels,
      alias: subDestination.alias,
    })),
  );
};
