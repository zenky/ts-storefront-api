import {AbstractResource} from "../client/resource.ts";
import {
  ListProductsRequest,
  Product,
  ProductVariantPriceCalculation,
  ProductVariantPriceCalculationRequest,
  ViewProductRequest
} from "./types.ts";
import {PaginatedResponse} from "../client/types.ts";

export class ProductsResource extends AbstractResource {
  async getProducts(storeId: string, request?: ListProductsRequest): Promise<PaginatedResponse<Product>> {
    const url = this.getStoreUrl(storeId, '/products', request);

    return this.getPaginatedResponse<Product>(await this.client.request('GET', url));
  }

  async getProduct(storeId: string, productId: string, request?: ViewProductRequest): Promise<Product> {
    const url = this.getStoreUrl(storeId, `/products/${productId}`, request);

    return this.getResponse<Product>(await this.client.request('GET', url));
  }

  async getProductVariantPrice(
    storeId: string,
    productId: string,
    variantId: string,
    request: ProductVariantPriceCalculationRequest
  ): Promise<ProductVariantPriceCalculation> {
    const url = this.getStoreUrl(storeId, `/products/${productId}/variants/${variantId}/price`);

    return this.getResponse(await this.client.request('POST', url, request));
  }
}
