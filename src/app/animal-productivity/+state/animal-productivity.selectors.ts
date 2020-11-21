import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  animalProductivityAdapter,
  AnimalProductivityPartialState,
  ANIMAL_PRODUCTIVITY_FEATURE_KEY,
  State,
} from "./animal-productivity.reducer";

const getAnimalProductivityState = createFeatureSelector<
  AnimalProductivityPartialState,
  State
>(ANIMAL_PRODUCTIVITY_FEATURE_KEY);

const { selectAll, selectEntities } = animalProductivityAdapter.getSelectors();

export const getAnimals = createSelector(
  getAnimalProductivityState,
  (state: State) => selectAll(state)
);

const getAnimalsEntities = createSelector(
  getAnimalProductivityState,
  (state: State) => selectEntities(state)
);

export const getAnimalEntities = createSelector(
  getAnimalProductivityState,
  (state: State) => state.animalEntities
);

const getSelectedId = createSelector(
  getAnimalProductivityState,
  (state: State) => state.selectedId
);

export const getSelectedAnimal = createSelector(
  getAnimalsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
