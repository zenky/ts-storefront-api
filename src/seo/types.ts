export interface SeoMetaTagAttribute {
  attribute: string;
  value: string;
}

export interface SeoMetaTag {
  name: SeoMetaTagAttribute;
  value: SeoMetaTagAttribute;
  additional: SeoMetaTagAttribute[];
}

export interface Seo {
  title: string | null;
  description: string | null;
  meta: SeoMetaTag[];
}
