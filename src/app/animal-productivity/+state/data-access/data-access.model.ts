export interface AnimalEntityMap {
  [key: string]: AnimalEntity;
}

export interface AnimalEntity {
  type: AnimalType;
  treatsForFirstLevelUp?: TreatQuantity;
  treats: TreatQuantity;
}

export interface TreatQuantity {
  [TreatType.TREAT]: number;
  [TreatType.GRAIN_TREAT]: number;
  [TreatType.VEGETABLE_TREAT]: number;
  [TreatType.NUTRA_TREAT]: number;
}

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  level: number;
  treatQuantity: TreatQuantity;
}

export enum AnimalType {
  CHICKEN = 'Chicken',
  SILKIE_CHICKEN = 'Silkie Chicken',
  COW = 'Cow',
  JERSEY_COW = 'Jersey Cow',
  SHEEP = 'Sheep',
  SUFFOLK_SHEEP = 'Suffolk Sheep',
  ALPACA = 'Alpaca',
}

export enum TreatType {
  TREAT = 'Treat',
  GRAIN_TREAT = 'Grain Treat',
  VEGETABLE_TREAT = 'Vegetable Treat',
  NUTRA_TREAT = 'Nutra Treat',
}
