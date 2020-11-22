import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AnimalProductivityEffects } from './+state/animal-productivity.effects';
import { AnimalProductivityFacade } from './+state/animal-productivity.facade';
import * as fromAnimalProductivity from './+state/animal-productivity.reducer';
import { DataAccessServiceModule } from './+state/data-access/data-access.service';
import { AnimalProductivityComponent } from './animal-productivity.component';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { TreatCounterComponent } from './animal-details/treat-counter/treat-counter.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalCreationComponent } from './animal-creation/animal-creation.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimalCreationFormComponent } from './animal-creation/animal-creation-form/animal-creation-form.component';
import { NumberIncreaseFormControlComponentModule } from './animal-creation/animal-creation-form/number-increase-form-control/number-increase-form-control.component';
import { ValueSelectionFormControlComponentModule } from './animal-creation/animal-creation-form/value-selection-form-control/value-selection-form-control.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmDeleteComponent } from './animal-details/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    AnimalProductivityComponent,
    AnimalDetailsComponent,
    TreatCounterComponent,
    AnimalListComponent,
    AnimalCreationComponent,
    AnimalCreationFormComponent,
    ConfirmDeleteComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAnimalProductivity.ANIMAL_PRODUCTIVITY_FEATURE_KEY,
      fromAnimalProductivity.reducer
    ),
    EffectsModule.forFeature([AnimalProductivityEffects]),
    DataAccessServiceModule,
    RouterModule,
    ReactiveFormsModule,
    NumberIncreaseFormControlComponentModule,
    ValueSelectionFormControlComponentModule,
    FontAwesomeModule,
  ],
  providers: [AnimalProductivityFacade],
})
export class AnimalProductivityModule {}
