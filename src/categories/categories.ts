import {AbstractResource} from "../client/resource.ts";
import {CategoriesListRequest, Category, NestedCategory} from "./types.ts";
import {InclusionRequest, PaginatedResponse} from "../client/types.ts";
import {Feature, FeaturesGroup} from "../features/types.ts";

export class CategoriesResource extends AbstractResource {
  public async getCategories(storeId: string, request?: CategoriesListRequest): Promise<PaginatedResponse<Category>> {
    const url = this.getStoreUrl(storeId, '/categories', request);

    return this.getPaginatedResponse<Category>(await this.client.request('GET', url));
  }

  public async getCategoriesTree(storeId: string, request?: InclusionRequest): Promise<NestedCategory[]> {
    const url = this.getStoreUrl(storeId, '/categories/tree', request);

    return this.getResponse<NestedCategory[]>(await this.client.request('GET', url));
  }

  public async getCategory(storeId: string, categoryId: string, request?: InclusionRequest): Promise<Category> {
    const url = this.getStoreUrl(storeId, `/categories/${categoryId}`, request);

    return this.getResponse<Category>(await this.client.request('GET', url));
  }

  public async getFeaturesGroups(storeId: string, categoryId: string): Promise<FeaturesGroup[]> {
    const url = this.getStoreUrl(storeId, `/categories/${categoryId}/features/groups`);

    return this.getResponse<FeaturesGroup[]>(await this.client.request('GET', url));
  }

  public async getFeatures(storeId: string, categoryId: string): Promise<Feature[]> {
    const url = this.getStoreUrl(storeId, `/categories/${categoryId}/features`);

    return this.getResponse<Feature[]>(await this.client.request('GET', url));
  }
}
