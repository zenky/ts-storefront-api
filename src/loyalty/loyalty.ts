import { AbstractResource } from "../client/resource.ts";
import { BonusesLevel } from "./types.ts";

export class LoyaltyResource extends AbstractResource {
  async getBonusesLevels(storeId: string): Promise<BonusesLevel[]> {
    const url = this.getStoreUrl(storeId, '/loyalty/bonuses-levels');

    return this.getResponse<BonusesLevel[]>(await this.client.request('GET', url));
  }
}
