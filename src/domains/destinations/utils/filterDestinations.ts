const normalize = (value: string) => value.trim().toLowerCase();

type DestinationSearchItem = {
  name: string;
  countryName: string;
  alias?: string[];
};

export const filterDestinations = <T extends DestinationSearchItem>(
  destinations: T[],
  search: string,
) => {
  const query = normalize(search);

  if (!query) {
    return destinations;
  }

  return destinations.filter((destination) => {
    const matchesCountryName = normalize(destination.countryName).includes(
      query,
    );
    const matchesDestinationName = normalize(destination.name).includes(query);
    const matchesAlias = destination.alias?.some((alias) =>
      normalize(alias).includes(query),
    );

    return matchesCountryName || matchesDestinationName || matchesAlias;
  });
};
