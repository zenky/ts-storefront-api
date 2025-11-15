import { AbstractResource } from '../client/resource.ts';
import { CatalogItem } from './types.ts';

export class CatalogResource extends AbstractResource {
  public async getCatalog(storeId: string): Promise<CatalogItem[]> {
    const url = this.getStoreUrl(storeId, '/catalog');

    return this.getResponse<CatalogItem[]>(await this.client.request('GET', url));
  }
}
