import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Animal, AnimalEntity } from "./data-access/data-access.model";
import * as fromAnimalProductivity from "./animal-productivity.reducer";
import * as AnimalProductivitySelectors from "./animal-productivity.selectors";
import {
  createAnimal,
  deleteAnimal,
  updateAnimal,
} from "./animal-productivity.actions";

@Injectable()
export class AnimalProductivityFacade {
  animals$: Observable<Animal[]> = this.store.pipe(
    select(AnimalProductivitySelectors.getAnimals)
  );
  animalEntities$: Observable<AnimalEntity[]> = this.store.pipe(
    select(AnimalProductivitySelectors.getAnimalEntities)
  );
  selectedAnimal$: Observable<Animal> = this.store.pipe(
    select(AnimalProductivitySelectors.getSelectedAnimal)
  );

  constructor(
    private store: Store<fromAnimalProductivity.AnimalProductivityPartialState>
  ) {}

  createAnimal(animal: Animal) {
    this.store.dispatch(createAnimal({ payload: animal }));
  }

  updateAnimal(id: string, animal: Animal) {
    this.store.dispatch(updateAnimal({ payload: { id, animal } }));
  }

  deleteAnimal(id: string) {
    this.store.dispatch(deleteAnimal({ payload: id }));
  }
}
