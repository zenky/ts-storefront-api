import {AbstractResource} from "../client/resource.ts";
import {InclusionRequest, ListRequest, PaginatedResponse} from "../client/types.ts";
import {Offer} from "./types.ts";

export class OffersResource extends AbstractResource {
  async getOffers(storeId: string, request?: ListRequest): Promise<PaginatedResponse<Offer>> {
    const url = this.getStoreUrl(storeId, '/offers', request);

    return this.getPaginatedResponse<Offer>(await this.client.request('GET', url));
  }

  async getOffer(storeId: string, offerId: string, request?: InclusionRequest): Promise<Offer> {
    const url = this.getStoreUrl(storeId, `/offers/${offerId}`, request);

    return this.getResponse<Offer>(await this.client.request('GET', url));
  }
}
