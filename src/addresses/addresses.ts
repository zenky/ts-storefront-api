import {AbstractResource} from "../client/resource.ts";
import {AddressSuggestions, AddressSuggestionsRequest} from "./types.ts";

export class AddressesResource extends AbstractResource {
  async getAddressSuggestions(storeId: string, request: AddressSuggestionsRequest): Promise<AddressSuggestions> {
    const url = this.getStoreUrl(storeId, '/suggestions/address');

    return this.getResponse<AddressSuggestions>(await this.client.request('POST', url, request));
  }
}
