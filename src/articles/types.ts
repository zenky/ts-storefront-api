import {Media} from "../media/types.ts";
import {ListRequest} from "../client/types.ts";

export interface ArticleCategory {
  id: string;
  short_id: string;
  slug: string | null;
  name: string | null;
}

export interface Article {
  id: string;
  short_id: string;
  slug: string | null;
  title: string | null;
  intro: string | null;
  body: string | null;
  updated_at: string;
  cover: Media | null;
  category?: ArticleCategory | null;
}

export interface ListArticlesRequest extends ListRequest {
  category_id?: string;
}
