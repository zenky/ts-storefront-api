import { AbstractResource } from "../client/resource.ts";
import { UploadMediaRequest, UploadedMedia } from "./types.ts";

export class MediaResource extends AbstractResource {
  async upload(storeId: string, request: UploadMediaRequest, apiToken?: string | null): Promise<UploadedMedia> {
    const url = this.getStoreUrl(storeId, '/media');

    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('owner_type', request.owner_type);
    formData.append('owner_id', request.owner_id);
    formData.append('collection', request.collection);

    return this.getResponse<UploadedMedia>(
      await this.client.requestMultipart(url, formData, apiToken),
    );
  }

  async delete(storeId: string, mediaId: string, token: string, apiToken?: string | null): Promise<boolean> {
    const url = this.getStoreUrl(storeId, `/media/${mediaId}`);

    await this.client.request('DELETE', url, { token }, apiToken);

    return true;
  }
}
