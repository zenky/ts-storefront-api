import {ClientConfig} from "./types.ts";
import {Client} from "./client.ts";
import {CategoriesResource} from "../categories/categories.ts";
import {StoreResource} from "../store/store.ts";
import {CollectionsResource} from "../collections/collections.ts";
import {OffersResource} from "../offers/offers.ts";
import {ArticlesResource} from "../articles/articles.ts";
import {FeedbackResource} from "../feedback/feedback.ts";
import {ProductsResource} from "../products/products.ts";
import {OrdersResource} from "../orders/orders.ts";
import {AddressesResource} from "../addresses/addresses.ts";
import {CustomersResource} from "../customers/customers.ts";
import {AuthenticationResource} from "../authentication/authentication.ts";

export class ZenkyStorefront {
  public readonly client: Client;
  public readonly store: StoreResource;
  public readonly auth: AuthenticationResource;
  public readonly customer: CustomersResource;
  public readonly categories: CategoriesResource;
  public readonly products: ProductsResource;
  public readonly addresses: AddressesResource;
  public readonly orders: OrdersResource;
  public readonly collections: CollectionsResource;
  public readonly offers: OffersResource;
  public readonly articles: ArticlesResource;
  public readonly feedback: FeedbackResource;

  constructor(config?: ClientConfig, fetcher?: any) {
    const client = Client.build(config, fetcher);

    this.store = new StoreResource(client);
    this.auth = new AuthenticationResource(client);
    this.customer = new CustomersResource(client);
    this.categories = new CategoriesResource(client);
    this.products = new ProductsResource(client);
    this.addresses = new AddressesResource(client);
    this.orders = new OrdersResource(client);
    this.collections = new CollectionsResource(client);
    this.offers = new OffersResource(client);
    this.articles = new ArticlesResource(client);
    this.feedback = new FeedbackResource(client);

    this.client = client;
  }

  setApiToken(token: string | null): ZenkyStorefront {
    this.client.setToken(token);

    return this;
  }
}
