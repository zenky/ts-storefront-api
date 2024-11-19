import {Media} from "../media/types.ts";
import {OrderingRequest, PaginationRequest, SearchRequest} from "../client/types.ts";

export interface ProductsCollection {
  id: string;
  name: string | null;
  description: string | null;
  cover: Media | null;
}

export interface CollectionsListRequest extends PaginationRequest, SearchRequest, OrderingRequest {
  //
}
