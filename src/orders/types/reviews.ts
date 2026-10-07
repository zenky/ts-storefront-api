import { Media } from "../../media/types.ts";

/** `images` — уже сохранённые фото в формате `Media`, не путать с `UploadedMedia` из media/types.ts. */
export interface OrderReview {
  id: string;
  score: number | null;
  comment: string | null;
  reply: string | null;
  images: Media[];
  created_at?: string;
  replied_at: string | null;
}

/** Хотя бы одно из двух полей обязательно — валидирует бэк. */
export interface SubmitOrderReviewRequest {
  score?: number;
  comment?: string;
}
