export interface ClientConfig {
  baseUrl?: string;
  baseAuthUrl?: string;
  token?: string;
  client?: string;
  timezone?: string;
  fetchOptions?: any;
}

export interface InclusionRequest {
  with?: string;
}

export interface PaginationRequest {
  count?: number;
  page?: number;
}

export interface SearchRequest {
  search?: string;
}

export interface OrderingRequest {
  order_by?: string;
}

export interface ListRequest extends PaginationRequest, InclusionRequest, SearchRequest, OrderingRequest {
  //
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: {
    previous?: string|null;
    next?: string|null;
  };
  has_previous_page: boolean;
  has_next_page: boolean;
  elements: {
    type: 'page' | 'placeholder';
    page: number | null;
    active: boolean;
  }[];
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}
