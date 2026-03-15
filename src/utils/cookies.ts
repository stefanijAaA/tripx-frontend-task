export const setCookie = (
  name: string,
  value: string,
  maxAgeSeconds?: number,
) => {
  const encodedValue = encodeURIComponent(value);

  const parts = [`${name}=${encodedValue}`, 'path=/'];

  if (maxAgeSeconds) {
    parts.push(`max-age=${maxAgeSeconds}`);
  }

  document.cookie = parts.join('; ');
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};
