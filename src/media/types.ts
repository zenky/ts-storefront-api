export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Media {
  placeholder: Image | null;
  medium: Image | null;
  large: Image | null;
  xlarge: Image | null;
  hd: Image | null;
}

export type MediaOwnerType = 'order';
export type MediaCollection = 'order_reviews';

export interface UploadMediaRequest {
  file: Blob;
  owner_type: MediaOwnerType;
  owner_id: string;
  collection: MediaCollection;
}

export interface UploadedMedia {
  id: string;
  url: string;
  /** Одноразовый токен удаления — передаётся в MediaResource.delete(), это НЕ apiToken. */
  token: string;
}
