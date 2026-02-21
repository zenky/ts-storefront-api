import { AbstractResource } from '../client/resource.ts';
import { CatalogItem, RemoteCatalog, ShowCatalogRequest } from './types.ts';

export class CatalogResource extends AbstractResource {
  public async getRemoteCatalog(storeId: string, request?: ShowCatalogRequest): Promise<RemoteCatalog> {
    const url = this.getStoreUrl(storeId, '/catalog', request);

    return this.getResponse<RemoteCatalog>(await this.client.request('GET', url));
  }

  public async getCatalogFromRemoteUrl(storeId: string, request?: ShowCatalogRequest): Promise<CatalogItem[]> {
    const remoteCatalog: RemoteCatalog = await this.getRemoteCatalog(storeId, request);

    return this.getResponse<CatalogItem[]>(await this.client.request('GET', remoteCatalog.url));
  }
}
