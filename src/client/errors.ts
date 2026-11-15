import { ApiError } from '../types.ts';

export class ZenkyError extends Error {
  public readonly err: ApiError | null;
  public readonly status: number | null;

  constructor(
    message: string,
    error: ApiError | null,
    status: number | null = null,
  ) {
    super(message);

    this.err = error;
    this.status = status;
  }
}

export class ZenkyErrorBuilder {
  static async build(response: any): Promise<ZenkyError> {
    let json: { error?: ApiError; message?: string } | null;
    try {
      json = await response.json();
    } catch {
      return new ZenkyError(
        response.status === 401
          ? 'Unauthenticated.'
          : response.statusText || `HTTP ${response.status}`,
        null,
        response.status,
      );
    }

    switch (response.status) {
      case 401:
        return new ZenkyError(
          json?.error?.message ?? json?.message ?? 'Unauthenticated.',
          json?.error ?? null,
          response.status,
        );
      default:
        return new ZenkyError(
          json?.error?.message ??
            json?.message ??
            (response.statusText || `HTTP ${response.status}`),
          json?.error ?? null,
          response.status,
        );
    }
  }
}
