import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AnimalProductivityEffects } from "./+state/animal-productivity.effects";
import { AnimalProductivityFacade } from "./+state/animal-productivity.facade";
import * as fromAnimalProductivity from "./+state/animal-productivity.reducer";
import { DataAccessServiceModule } from "./+state/data-access/data-access.service";
import { AnimalProductivityComponent } from "./animal-productivity.component";

@NgModule({
  declarations: [AnimalProductivityComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAnimalProductivity.ANIMAL_PRODUCTIVITY_FEATURE_KEY,
      fromAnimalProductivity.reducer
    ),
    EffectsModule.forFeature([AnimalProductivityEffects]),
    DataAccessServiceModule,
  ],
  providers: [AnimalProductivityFacade],
})
export class AnimalProductivityModule {}
