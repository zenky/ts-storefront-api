import { AbstractResource } from "../client/resource.ts";
import { Creative, CreativesRequest } from "./types.ts";

export class CreativesResource extends AbstractResource {
  async getCreatives(storeId: string, request: CreativesRequest): Promise<Creative[]> {
    const url = this.getStoreUrl(storeId, '/creatives', request);

    return this.getResponse<Creative[]>(await this.client.request('GET', url));
  }
}
