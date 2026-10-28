import { PhoneRequest } from "../../types.ts";
import { DeliveryMethod } from "./delivery.ts";

export enum OrderFieldType {
  Text = 'text',
  Textarea = 'textarea',
  Phone = 'phone',
  Select = 'select',
  Toggle = 'toggle',
}

export interface OrderFieldOption {
  value: string;
  label: string;
}

export interface OrderFieldDefinition {
  id: string;
  type: OrderFieldType;
  label: string;
  hint: string | null;
  values?: OrderFieldOption[];
  default_value: boolean | null;
  delivery_methods: DeliveryMethod[];
}

export type OrderFieldValue = string | boolean | PhoneRequest | OrderFieldOption | null;

export interface AttachedOrderField {
  id: string;
  type: OrderFieldType;
  label: string;
  value: OrderFieldValue;
}

export interface SetOrderFieldValue {
  id: string;
  value: string | boolean | PhoneRequest | null;
}

export interface SetOrderFieldsRequest {
  fields: SetOrderFieldValue[];
}
