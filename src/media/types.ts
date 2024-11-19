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
