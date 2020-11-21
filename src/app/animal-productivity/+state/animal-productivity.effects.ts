import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import * as AnimalProductivityActions from './animal-productivity.actions';
import { DataAccessService } from './data-access/data-access.service';

@Injectable()
export class AnimalProductivityEffects {
  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalProductivityActions.loadAnimals),
      switchMap(() =>
        this.service.getAllAnimals().pipe(
          map((allAnimals) =>
            AnimalProductivityActions.loadAnimalsSuccess({
              payload: allAnimals,
            })
          )
        )
      ),
      catchError((error) => {
        return of(AnimalProductivityActions.loadAnimalsFailure(error));
      })
    )
  );

  loadAnimalEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalProductivityActions.loadAnimalEntities),
      switchMap(() =>
        this.service.getAnimalEnities().pipe(
          map((animalEntities) =>
            AnimalProductivityActions.loadAnimalEntitiesSuccess({
              payload: animalEntities,
            })
          )
        )
      ),
      catchError((error) => {
        return of(AnimalProductivityActions.loadAnimalEntitiesFailure(error));
      })
    )
  );

  createAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalProductivityActions.createAnimal),
      map((action) => action.payload),
      switchMap((payload) =>
        this.service.createAnimal(payload).pipe(
          map((createdPayload) =>
            AnimalProductivityActions.createAnimalSuccess({
              payload: createdPayload,
            })
          )
        )
      ),
      catchError((error) => {
        return of(AnimalProductivityActions.createAnimalFailure(error));
      })
    )
  );

  updateAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalProductivityActions.updateAnimal),
      map((action) => action.payload),
      switchMap((payload) =>
        this.service.updateAnimalById(payload.animal, payload.id).pipe(
          map((updatedPayload) =>
            AnimalProductivityActions.updateAnimalSuccess({
              payload: updatedPayload,
            })
          )
        )
      ),
      catchError((error) => {
        return of(AnimalProductivityActions.updateAnimalFailure(error));
      })
    )
  );

  deleteAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalProductivityActions.deleteAnimal),
      map((action) => action.payload),
      switchMap((payload) =>
        this.service.deleteAnimalById(payload).pipe(
          map((deletedId) =>
            AnimalProductivityActions.deleteAnimalSuccess({
              payload: deletedId,
            })
          )
        )
      ),
      catchError((error) => {
        return of(AnimalProductivityActions.deleteAnimalFailure(error));
      })
    )
  );

  constructor(private actions$: Actions, private service: DataAccessService) {}
}
