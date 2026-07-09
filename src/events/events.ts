import { AbstractResource } from "../client/resource.ts";
import { CommerceEventsRequest, CommerceEventsResult } from "./types.ts";

export class CommerceEventsResource extends AbstractResource {
  async create(
    storeId: string,
    request: CommerceEventsRequest,
    apiToken?: string,
  ): Promise<CommerceEventsResult> {
    const url = this.getStoreUrl(storeId, '/events');

    return this.getResponse<CommerceEventsResult>(
      await this.client.request('POST', url, request, apiToken),
    );
  }
}
