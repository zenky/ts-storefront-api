export interface FeatureValue {
  id: string;
  alias: string;
  name: string | null;
  range: number | null;
}

export enum FeatureType {
  Select = 'select',
  MutipleSelect = 'mutiple_select',
  Checkboxes = 'checkboxes',
  Radios = 'radios',
  Range = 'range',
  Text = 'text',
}

export enum FeatureRange {
  Integer = 'integer',
  Float = 'float',
}

export interface Feature {
  id: string;
  alias: string;
  name: string | null;
  filterable: boolean;
  type: FeatureType;
  range: FeatureRange | null;
  values: FeatureValue[];
}

export interface FeaturesGroup {
  id: string;
  name: string | null;
  description: string | null;
  features: Feature[];
}
