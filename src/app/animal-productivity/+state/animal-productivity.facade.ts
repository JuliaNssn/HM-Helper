import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  createAnimal,
  deleteAnimal,
  updateAnimal,
} from './animal-productivity.actions';
import * as fromAnimalProductivity from './animal-productivity.reducer';
import * as AnimalProductivitySelectors from './animal-productivity.selectors';
import {
  Animal,
  AnimalEntityMap,
  AnimalType,
  TreatQuantity,
  TreatType,
} from './data-access/data-access.model';

const animalEntityMap = {
  [AnimalType.ALPACA]: {
    type: AnimalType.ALPACA,
    treatsForFirstLevelUp: {
      [TreatType.TREAT]: 0,
      [TreatType.GRAIN_TREAT]: 15,
      [TreatType.VEGETABLE_TREAT]: 15,
      [TreatType.NUTRA_TREAT]: 15,
    },
    treats: {
      [TreatType.TREAT]: 0,
      [TreatType.GRAIN_TREAT]: 5,
      [TreatType.VEGETABLE_TREAT]: 15,
      [TreatType.NUTRA_TREAT]: 5,
    },
  },
  [AnimalType.CHICKEN]: {
    type: AnimalType.CHICKEN,
    treats: {
      [TreatType.TREAT]: 2,
      [TreatType.GRAIN_TREAT]: 4,
      [TreatType.VEGETABLE_TREAT]: 15,
      [TreatType.NUTRA_TREAT]: 10,
    },
  },
  [AnimalType.SILKIE_CHICKEN]: {
    type: AnimalType.SILKIE_CHICKEN,
    treats: {
      [TreatType.TREAT]: 1,
      [TreatType.GRAIN_TREAT]: 2,
      [TreatType.VEGETABLE_TREAT]: 14,
      [TreatType.NUTRA_TREAT]: 14,
    },
  },
  [AnimalType.COW]: {
    type: AnimalType.COW,
    treats: {
      [TreatType.TREAT]: 7,
      [TreatType.GRAIN_TREAT]: 15,
      [TreatType.VEGETABLE_TREAT]: 8,
      [TreatType.NUTRA_TREAT]: 1,
    },
  },
  [AnimalType.JERSEY_COW]: {
    type: AnimalType.JERSEY_COW,
    treats: {
      [TreatType.TREAT]: 4,
      [TreatType.GRAIN_TREAT]: 20,
      [TreatType.VEGETABLE_TREAT]: 6,
      [TreatType.NUTRA_TREAT]: 1,
    },
  },
  [AnimalType.SHEEP]: {
    type: AnimalType.SHEEP,
    treats: {
      [TreatType.TREAT]: 2,
      [TreatType.GRAIN_TREAT]: 12,
      [TreatType.VEGETABLE_TREAT]: 12,
      [TreatType.NUTRA_TREAT]: 5,
    },
  },
  [AnimalType.SUFFOLK_SHEEP]: {
    type: AnimalType.SUFFOLK_SHEEP,
    treats: {
      [TreatType.TREAT]: 1,
      [TreatType.GRAIN_TREAT]: 9,
      [TreatType.VEGETABLE_TREAT]: 15,
      [TreatType.NUTRA_TREAT]: 6,
    },
  },
};

const initialTreatCount: TreatQuantity = {
  [TreatType.TREAT]: 0,
  [TreatType.GRAIN_TREAT]: 0,
  [TreatType.VEGETABLE_TREAT]: 0,
  [TreatType.NUTRA_TREAT]: 0,
};

@Injectable()
export class AnimalProductivityFacade {
  animals$: Observable<Animal[]> = this.store.pipe(
    select(AnimalProductivitySelectors.getAnimals)
  );
  selectedAnimal$: Observable<Animal> = this.store.pipe(
    select(AnimalProductivitySelectors.getSelectedAnimal)
  ) as Observable<Animal>;

  animalEntityMap: AnimalEntityMap = animalEntityMap;
  initialTreatCount: TreatQuantity = initialTreatCount;

  constructor(
    private store: Store<fromAnimalProductivity.AnimalProductivityPartialState>
  ) {}

  createAnimal(animal: Animal) {
    const payload: Animal = {
      ...animal,
      treatQuantity: this.initialTreatCount,
    };
    this.store.dispatch(createAnimal({ payload }));
  }

  updateAnimal(id: string, animal: Animal) {
    this.store.dispatch(updateAnimal({ payload: { id, animal } }));
  }

  deleteAnimal(id: string) {
    this.store.dispatch(deleteAnimal({ payload: id }));
  }

  getMaxTreatCountForAnimalType(type: AnimalType): TreatQuantity {
    if (type === AnimalType.ALPACA) {
      return {
        [TreatType.TREAT]:
          animalEntityMap[AnimalType.ALPACA].treatsForFirstLevelUp[
            TreatType.TREAT
          ] +
          animalEntityMap[AnimalType.ALPACA].treats[TreatType.TREAT] * 3,
        [TreatType.GRAIN_TREAT]:
          animalEntityMap[AnimalType.ALPACA].treatsForFirstLevelUp[
            TreatType.GRAIN_TREAT
          ] +
          animalEntityMap[AnimalType.ALPACA].treats[TreatType.GRAIN_TREAT] * 3,
        [TreatType.VEGETABLE_TREAT]:
          animalEntityMap[AnimalType.ALPACA].treatsForFirstLevelUp[
            TreatType.VEGETABLE_TREAT
          ] +
          animalEntityMap[AnimalType.ALPACA].treats[TreatType.VEGETABLE_TREAT] *
            3,
        [TreatType.NUTRA_TREAT]:
          animalEntityMap[AnimalType.ALPACA].treatsForFirstLevelUp[
            TreatType.NUTRA_TREAT
          ] +
          animalEntityMap[AnimalType.ALPACA].treats[TreatType.NUTRA_TREAT] * 3,
      };
    } else {
      return {
        [TreatType.TREAT]: animalEntityMap[type].treats[TreatType.TREAT] * 4,
        [TreatType.GRAIN_TREAT]:
          animalEntityMap[type].treats[TreatType.GRAIN_TREAT] * 4,
        [TreatType.VEGETABLE_TREAT]:
          animalEntityMap[type].treats[TreatType.VEGETABLE_TREAT] * 4,
        [TreatType.NUTRA_TREAT]:
          animalEntityMap[type].treats[TreatType.NUTRA_TREAT] * 4,
      };
    }
  }
}
