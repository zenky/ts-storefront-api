import {Media} from "../media/types.ts";
import {Seo} from "../seo/types.ts";
import {ListRequest} from "../client/types.ts";

export interface Category {
  id: string;
  short_id: string;
  parent_id: string | null;
  is_featured: boolean;
  slug: string | null;
  name: string | null;
  description: string | null;
  cover?: Media | null;
  seo?: Seo | null;
}

export interface NestedCategory extends Category {
  children: NestedCategory[];
}

export interface CategoriesListRequest extends ListRequest {
  featured?: boolean;
}
