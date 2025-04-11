import { ApiHomepageHomepage } from '../../../schemas';

export type ImageType = {
  src: string;
  alt: string;
};

export const mapImages = (array = []): ImageType[] =>
  array.map((item: ApiHomepageHomepage['attributes']['gallery']) => ({
    src: item.url.startsWith('/uploads') ? `https://server.thealchemist.de${item.url}` : item.url,
    alt: item.name,
  }));
