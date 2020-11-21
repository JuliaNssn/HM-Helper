import { createAction, props } from "@ngrx/store";
import { Animal, AnimalEntity } from "./data-access/data-access.model";

export const createAnimal = createAction(
  "[AnimalProductivity] Create Animal",
  props<{ payload: Animal }>()
);
export const createAnimalSuccess = createAction(
  "[AnimalProductivity] Create Animal Success",
  props<{ payload: Animal }>()
);
export const createAnimalFailure = createAction(
  "[AnimalProductivity] Create Animal Failure",
  props<{ payload: any }>()
);

export const loadAnimals = createAction("[AnimalProductivity] Load Animals");
export const loadAnimalsSuccess = createAction(
  "[AnimalProductivity] Load Animals Success",
  props<{ payload: Animal[] }>()
);
export const loadAnimalsFailure = createAction(
  "[AnimalProductivity] Load Animals Failure",
  props<{ payload: any }>()
);

export const loadAnimalEntities = createAction(
  "[AnimalProductivity] Load Animal Entities"
);
export const loadAnimalEntitiesSuccess = createAction(
  "[AnimalProductivity] Load Animal Entities Success",
  props<{ payload: AnimalEntity[] }>()
);
export const loadAnimalEntitiesFailure = createAction(
  "[AnimalProductivity] Load Animal Entities Failure",
  props<{ payload: any }>()
);

export const updateAnimal = createAction(
  "[AnimalProductivity] Update Animal",
  props<{ payload: { id: string; animal: Animal } }>()
);
export const updateAnimalSuccess = createAction(
  "[AnimalProductivity] Update Animal Success",
  props<{ payload: Animal }>()
);
export const updateAnimalFailure = createAction(
  "[AnimalProductivity] Update Animal Failure",
  props<{ payload: any }>()
);

export const deleteAnimal = createAction(
  "[AnimalProductivity] Delete Animal",
  props<{ payload: string }>()
);
export const deleteAnimalSuccess = createAction(
  "[AnimalProductivity] Delete Animal Success",
  props<{ payload: string }>()
);
export const deleteAnimalFailure = createAction(
  "[AnimalProductivity] Delete Animal Failure",
  props<{ payload: any }>()
);
