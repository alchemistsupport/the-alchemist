import { getStrapiURL } from './api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStrapiMedia(media: any) {
  const url = media?.data?.attributes.url || media?.attributes?.url;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
}
