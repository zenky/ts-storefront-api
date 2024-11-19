import {AbstractResource} from "../client/resource.ts";
import {CallbackRequest, Feedback, FeedbackRequest} from "./types.ts";

export class FeedbackResource extends AbstractResource {
  async createFeedback(storeId: string, request: FeedbackRequest): Promise<Feedback> {
    const url = this.getStoreUrl(storeId, '/feedback', request);

    return this.getResponse<Feedback>(await this.client.request('POST', url));
  }

  async createCallback(storeId: string, request: CallbackRequest): Promise<boolean> {
    const url = this.getStoreUrl(storeId, '/callback', request);

    await this.client.request('POST', url);

    return true;
  }
}
