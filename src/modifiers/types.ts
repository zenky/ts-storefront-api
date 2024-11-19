export interface Modifier {
  id: string;
  sku: string | null;
  name: string | null;
  price: number | null;
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

export interface ProductModifiersGroup {
  group: ModifiersGroup;
  is_required: boolean;
  min_quantity: number | null;
  max_quantity: number | null;
}
