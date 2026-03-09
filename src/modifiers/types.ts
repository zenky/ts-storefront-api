import { Media } from '../media/types.ts';

export interface Modifier {
  id: string;
  sku: string | null;
  name: string | null;
  price: number | null;
  cover?: Media | null;
}

export interface BasicModifiersGroup {
  id: string;
  name: string | null;
}

export interface ModifiersGroup extends BasicModifiersGroup {
  modifiers: Modifier[];
}

export interface ProductModifier {
  modifier: Modifier;
  is_required: boolean;
  min_quantity: number | null;
  max_quantity: number | null;
}

export interface ProductModifiersGroupInfo extends BasicModifiersGroup {
  modifiers: ProductModifier[];
}

export interface ProductModifiersGroup {
  group: ProductModifiersGroupInfo;
  is_required: boolean;
  min_quantity: number | null;
  max_quantity: number | null;
}
