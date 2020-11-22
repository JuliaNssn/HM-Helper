import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimalProductivityFacade } from './+state/animal-productivity.facade';
import {
  Animal,
  AnimalEntityMap,
  AnimalType,
  TreatQuantity,
  TreatType,
} from './+state/data-access/data-access.model';

function levelUpIfPossible(
  animal: Animal,
  maxTreatQuantityForType?: TreatQuantity
) {
  if (!maxTreatQuantityForType || animal.level >= 5) {
    return animal;
  }
  return Object.values(TreatType).every(
    (type) => animal.treatQuantity[type] >= maxTreatQuantityForType[type]
  )
    ? {
        ...animal,
        level: animal.level + 1,
        treatQuantity: {
          [TreatType.TREAT]:
            Number(animal.treatQuantity[TreatType.TREAT]) -
            maxTreatQuantityForType[TreatType.TREAT],
          [TreatType.GRAIN_TREAT]:
            Number(animal.treatQuantity[TreatType.GRAIN_TREAT]) -
            maxTreatQuantityForType[TreatType.GRAIN_TREAT],
          [TreatType.VEGETABLE_TREAT]:
            Number(animal.treatQuantity[TreatType.VEGETABLE_TREAT]) -
            maxTreatQuantityForType[TreatType.VEGETABLE_TREAT],
          [TreatType.NUTRA_TREAT]:
            Number(animal.treatQuantity[TreatType.NUTRA_TREAT]) -
            maxTreatQuantityForType[TreatType.NUTRA_TREAT],
        },
      }
    : animal;
}

function levelDownIfPossible(
  animal: Animal,
  decreasedTreatType: TreatType,
  treatQuantityForPreviousLevel?: TreatQuantity
) {
  if (
    !treatQuantityForPreviousLevel ||
    animal.treatQuantity[decreasedTreatType] >= 0 ||
    animal.level === 1
  ) {
    return animal;
  }
  return {
    ...animal,
    level: animal.level - 1,
    treatQuantity: {
      [TreatType.TREAT]:
        Number(animal.treatQuantity[TreatType.TREAT]) +
        treatQuantityForPreviousLevel[TreatType.TREAT],
      [TreatType.GRAIN_TREAT]:
        Number(animal.treatQuantity[TreatType.GRAIN_TREAT]) +
        treatQuantityForPreviousLevel[TreatType.GRAIN_TREAT],
      [TreatType.VEGETABLE_TREAT]:
        Number(animal.treatQuantity[TreatType.VEGETABLE_TREAT]) +
        treatQuantityForPreviousLevel[TreatType.VEGETABLE_TREAT],
      [TreatType.NUTRA_TREAT]:
        Number(animal.treatQuantity[TreatType.NUTRA_TREAT]) +
        treatQuantityForPreviousLevel[TreatType.NUTRA_TREAT],
    },
  };
}

@Component({
  selector: 'animal-productivity',
  templateUrl: './animal-productivity.component.html',
  styleUrls: ['./animal-productivity.component.scss'],
})
export class AnimalProductivityComponent {
  animals$: Observable<Animal[]> = this.facade.animals$;
  selectedAnimal$: Observable<Animal> = this.facade.selectedAnimal$;

  animalEntityMap: AnimalEntityMap = this.facade.animalEntityMap;

  constructor(private facade: AnimalProductivityFacade) {}

  isAnimalAlpacaLvl1(animal: Animal): boolean {
    return animal.type === AnimalType.ALPACA && animal.level === 1;
  }

  onAddNewAnimal($event: Animal) {
    this.facade.createAnimal($event);
  }

  onIncreaseTreatQuantity($event: { type: TreatType; animal: Animal }) {
    const treatQuantity: TreatQuantity = { ...$event.animal.treatQuantity };
    treatQuantity[$event.type]++;
    let animal = {
      ...$event.animal,
      treatQuantity,
    };

    animal = levelUpIfPossible(
      animal,
      this.isAnimalAlpacaLvl1(animal)
        ? this.animalEntityMap[animal.type].treatsForFirstLevelUp
        : this.animalEntityMap[animal.type].treats
    );

    this.facade.updateAnimal($event.animal.id, animal);
  }

  onDecreaseTreatQuantity($event: { type: TreatType; animal: Animal }) {
    const treatQuantity: TreatQuantity = { ...$event.animal.treatQuantity };
    treatQuantity[$event.type]--;
    let animal = {
      ...$event.animal,
      treatQuantity,
    };

    animal = levelDownIfPossible(
      animal,
      $event.type,
      this.getTreatQuantityForPreviousLevel(animal.type, animal.level)
    );

    this.facade.updateAnimal($event.animal.id, animal);
  }

  getTreatQuantityForPreviousLevel(animalType: AnimalType, level: number) {
    if (animalType === AnimalType.ALPACA && level === 2) {
      return this.animalEntityMap[AnimalType.ALPACA].treatsForFirstLevelUp;
    } else {
      return this.animalEntityMap[animalType].treats;
    }
  }

  onDeleteAnimal($event: string) {
    this.facade.deleteAnimal($event);
  }
}
