export interface AnimalEntity {
  type: AnimalType;
  treatsForFirstLevelUp?: TreatQuantity;
  treats: TreatQuantity;
}

export interface TreatQuantity {
  treat: number;
  grainTreat: number;
  vegetableTreat: number;
  nutraTreat: number;
}

export interface Animal {
  id: string;
  name: string;
  type: AnimalEntity;
  level: number;
  treatQuantity: TreatQuantity;
}

export enum AnimalType {
  CHICKEN = "chicken",
  SILKIE_CHICKEN = "silkieChicken",
  COW = "cow",
  JERSEY_COW = "jerseyCow",
  SHEEP = "sheep",
  SUFFOLK_SHEEP = "suffolkSheep",
  ALPACA = "alpaca",
}

export enum TreatType {
  TREAT = "treat",
  GRAIN_TREAT = "grainTreat",
  VEGETABLE_TREAT = "vegetableTreat",
  NUTRA_TREAT = "nutraTreat",
}
