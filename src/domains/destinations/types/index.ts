export type DestinationPageProps = {
  bookingCode?: string;
};

export type DestinationCodeBannerProps = DestinationPageProps & {};

export type DestinationListItem = {
  countryName: string;
  countrySlug: string;
  countryCode: string;
  countryThumbnail: string | null;
  name: string;
  slug: string;
  code: string;
  thumbnail: string | null;
  countHotels: number;
  alias: string[];
};

export type DestinationCardProps = {
  destination: DestinationListItem;
};

export type DestinationsListProps = {
  destinations: DestinationListItem[];
};

export type DestinationSearchItem = {
  name: string;
  countryName: string;
  alias?: string[];
};
