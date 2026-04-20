import { Media } from "../media/types.ts";
import { RemoteCatalog } from '../catalog/types.ts';
import {
  AddressesProvider,
  Contact,
  GeoLocation,
  OrderAuthenticationMethod,
  Phone,
  RecaptchaAction,
  Schedule,
} from "../types.ts";

export interface Stock {
  id: string;
  name: string | null;
  description: string | null;
  address: string | null;
  coordinates: GeoLocation | null;
  links: Contact[];
  phones: Phone[];
  schedule: Schedule | null;
}

export interface DeliveryZone {
  id: string;
  name: string | null;
  coordinates: GeoLocation[];
  description: string | null;
  color: string | null;
  min_price: number | null;
  free_delivery_price: number | null;
  delivery_price: number | null;
  delivery_time: string | null;
}

export interface City {
  id: string;
  is_default: boolean;
  name: string | null;
  timezone: string;
  coordinates: GeoLocation | null;
  schedule: Schedule | null;
  stocks?: Stock[];
  delivery_zones?: DeliveryZone[];
  phones?: Phone[];
}

export interface StoreSettings {
  country: string;
  currency: string;
  orders: {
    authentication_method: OrderAuthenticationMethod;
    use_early_delivery: boolean;
    addresses_provider: AddressesProvider;
    repeats: {
      enabled: boolean;
    };
    checkout_ui: {
      enabled: boolean;
      message: string | null;
      closed_message: string | null;
      legal: {
        accept_label: string | null;
      };
    };
  };
  products: {
    use_stock_filter: boolean;
    search: {
      enabled: boolean;
    };
  };
  loyalty: {
    enabled: boolean;
    bonuses: {
      on_demand_balance_enabled: boolean;
      pin_enabled: boolean;
    },
  };
  recaptcha: {
    actions: RecaptchaAction[];
    key: string;
  } | null;
  websockets: {
    app_id: string;
    app_key: string;
    options: {
      host: string;
      port: number;
    };
  } | null;
  legal: {
    documents: {
      available: AvailableLegalDocumentType[];
    };
  };
}

export interface Store {
  id: string;
  name: string;
  domain: string | null;
  app_store_url: string | null;
  google_play_url: string | null;
  logo: Media | null;
  square_logo: Media | null;
  links: Contact[];
  phones: Phone[];
  cities: City[];
  catalogs: RemoteCatalog[];
  settings: StoreSettings;
}

export interface LegalProfileField {
  field: string;
  value: string;
}

export interface LegalProfile {
  name: string;
  legal_address: string;
  postal_address: string;
  fields: LegalProfileField[];
}

export interface LegalDocument {
  content: string;
}

export enum LegalDocumentType {
  PrivacyPolicy = 'privacy_policy',
  PersonalData = 'personal_data',
  Eula = 'eula',
  Terms = 'terms',
  PersonalDataAgreement = 'personal_data_agreement',
  LoyaltyRules = 'loyalty_rules',
}

export type AvailableLegalDocumentType = Exclude<LegalDocumentType, LegalDocumentType.LoyaltyRules>;
