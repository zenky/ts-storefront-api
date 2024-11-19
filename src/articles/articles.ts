import {AbstractResource} from "../client/resource.ts";
import {InclusionRequest, PaginatedResponse} from "../client/types.ts";
import {ArticleCategory, ListArticlesRequest} from "./types.ts";

export class ArticlesResource extends AbstractResource {
  async getArticleCategories(storeId: string): Promise<PaginatedResponse<ArticleCategory>> {
    const url = this.getStoreUrl(storeId, '/articles/categories');

    return this.getPaginatedResponse<ArticleCategory>(await this.client.request('GET', url));
  }

  async getArticleCategory(storeId: string, categoryId: string): Promise<ArticleCategory> {
    const url = this.getStoreUrl(storeId, `/articles/categories/${categoryId}`);

    return this.getResponse<ArticleCategory>(await this.client.request('GET', url));
  }

  async getArticles(storeId: string, request?: ListArticlesRequest): Promise<PaginatedResponse<ArticleCategory>> {
    const url = this.getStoreUrl(storeId, '/articles', request);

    return this.getPaginatedResponse<ArticleCategory>(await this.client.request('GET', url));
  }

  async getArticle(storeId: string, articleId: string, request?: InclusionRequest): Promise<ArticleCategory> {
    const url = this.getStoreUrl(storeId, `/articles/${articleId}`, request);

    return this.getResponse<ArticleCategory>(await this.client.request('GET', url));
  }
}
