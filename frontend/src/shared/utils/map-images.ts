import { ApiHomepageHomepage } from '../../../schemas';

export type ImageType = {
  src: string;
  alt: string;
};

export const mapImages = (array = []): ImageType[] =>
  array.map((item: ApiHomepageHomepage['attributes']['gallery']) => ({
    src: item.url,
    alt: item.name,
  }));
