import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import * as AnimalProductivityActions from "./animal-productivity.actions";
import { Action, createReducer, on } from "@ngrx/store";
import { Animal, AnimalEntity } from "./data-access/data-access.model";

export const ANIMAL_PRODUCTIVITY_FEATURE_KEY = "animal-productivity";

export interface State extends EntityState<Animal> {
  animalEntities: AnimalEntity[];
  selectedId: string;
}

export interface AnimalProductivityPartialState {
  readonly [ANIMAL_PRODUCTIVITY_FEATURE_KEY]: State;
}

export const animalProductivityAdapter: EntityAdapter<Animal> = createEntityAdapter<Animal>(
  {
    selectId: ({ id }: Animal) => id,
  }
);

export const initialState: State = animalProductivityAdapter.getInitialState({
  animalEntities: [],
  selectedId: null,
});

const animalProductivityReducer = createReducer(
  initialState,
  on(AnimalProductivityActions.loadAnimalsSuccess, (state, { payload }) =>
    animalProductivityAdapter.setAll(payload, state)
  ),
  on(
    AnimalProductivityActions.updateAnimalSuccess,
    AnimalProductivityActions.createAnimalSuccess,
    (state, { payload }) => animalProductivityAdapter.upsertOne(payload, state)
  ),
  on(AnimalProductivityActions.deleteAnimalSuccess, (state, { payload }) =>
    animalProductivityAdapter.removeOne(payload, state)
  ),
  on(
    AnimalProductivityActions.loadAnimalEntitiesSuccess,
    (state, { payload }) => ({
      ...state,
      animalEntities: payload,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return animalProductivityReducer(state, action);
}
