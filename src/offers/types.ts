import {Media} from "../media/types.ts";

export interface OfferBanner {
  title: string | null;
  description: string | null;
  image: Media | null;
}

export interface OfferArticle {
  title: string | null;
  intro: string | null;
  body: string | null;
  cover: Media | null;
}

export interface Offer {
  id: string;
  short_id: string;
  slug: string | null;
  banners: {
    desktop: OfferBanner | null;
    mobile: OfferBanner | null;
  };
  article?: OfferArticle | null;
}
