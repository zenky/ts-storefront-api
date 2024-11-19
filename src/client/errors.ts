import {ApiError} from "../types.ts";

export class ZenkyError extends Error {
  public readonly err: ApiError | null;

  constructor(message: string, error: ApiError | null) {
    super(message);

    this.err = error;
  }
}

export class ZenkyErrorBuilder {
  static async build(response: any): Promise<ZenkyError> {
    const json: any = await response.json();

    switch (response.status) {
      case 401:
        return new ZenkyError(json?.message ?? 'Unauthenticated.', null);
      default:
        return new ZenkyError(json?.message, json?.error || null);
    }
  }
}
