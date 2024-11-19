import {ClientConfig} from "./types.ts";
import {ZenkyErrorBuilder} from "./errors.ts";

export class Client {
  private readonly baseUrl: string;
  private readonly baseAuthUrl: string;
  private token: string|null;
  private readonly client: string;
  private readonly timezone: string;
  private readonly fetchFunction: any;
  private readonly fetchOptions: any;

  static build(config?: ClientConfig|null|undefined, fetcher?: any): Client {
    return new Client(
      config?.baseUrl || 'https://storefront.zenky.io/v1',
      config?.baseAuthUrl || 'https://auth.zenky.io/',
      config?.token || null,
      config?.client || 'web',
      config?.timezone || 'UTC',
      fetcher,
      config?.fetchOptions,
    );
  }

  private constructor(
    baseUrl: string,
    baseAuthUrl: string,
    token: string|null,
    client: string,
    timezone: string,
    fetcher?: any,
    fetchOptions?: any
  ) {
    this.baseUrl = baseUrl;
    this.baseAuthUrl = baseAuthUrl;
    this.token = token;
    this.client = client;
    this.timezone = timezone;
    this.fetchFunction = typeof fetcher === 'function' ? fetcher : fetch;
    this.fetchOptions = typeof fetchOptions !== 'undefined' ? fetchOptions : {};
  }

  setToken(token: string|null): Client {
    this.token = token;

    return this;
  }

  getBaseAuthUrl(): string {
    return this.baseAuthUrl;
  }

  getStoreUrl(storeId: string, path: string, query: any = {}): string {
    return this.getUrl(`/store/${storeId}${path}`, query);
  }

  getUrl(path: string, query: any = {}): string {
    if (!Object.keys(query).length) {
      return path;
    }

    const params: string[] = [];

    Object.keys(query).forEach((key) => {
      params.push(`${key}=${query[key]}`);
    });

    const sign = path.includes('?') ? '&' : '?';

    return `${path}${sign}${params.join('&')}`;
  }

  async request(method: string, path: string, body?: any, apiToken?: string | null): Promise<any> {
    const headers: any = {
      Accept: 'application/json',
      'X-Zenky-Client': this.client,
      'X-Timezone': this.timezone,
    };

    if (apiToken) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    } else if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const options: any = {
      method,
      mode: 'cors',
      ...this.fetchOptions,
    };

    if (body) {
      headers['Content-Type'] = 'application/json';
      options['body'] = JSON.stringify(body);
    }

    options.headers = headers;

    const response = await this.fetchFunction.call(null, `${this.baseUrl}${path}`, options);

    if (response.ok) {
      return response.status === 204 ? true : response.json();
    }

    throw await ZenkyErrorBuilder.build(response);
  }
}
