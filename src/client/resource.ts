import {PaginatedResponse} from "./types.ts";
import {Client} from "./client.ts";

export abstract class AbstractResource {
  constructor(protected client: Client) {
    //
  }

  protected getStoreUrl(storeId: string, path: string, query: any = {}): string {
    return this.client.getStoreUrl(storeId, path, query);
  }

  protected getPaginatedResponse<T>(response: any): PaginatedResponse<T> {
    if (!response || !Array.isArray(response.data) || !response.meta || !response.meta.pagination) {
      throw new Error('getPaginatedResponse(): Invalid response.');
    }

    const items: T[] = response.data;
    const pagination = response.meta.pagination;

    return {
      items,
      pagination,
    };
  }

  protected getResponse<T>(response: any): T {
    if (!response || !response.data) {
      throw new Error('getResponse(): Invalid response.');
    }

    return response.data;
  }
}
