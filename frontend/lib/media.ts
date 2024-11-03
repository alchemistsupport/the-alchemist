import { getStrapiURL } from './api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStrapiMedia(media: any) {
  const url = media?.data?.url || media?.url;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
}
