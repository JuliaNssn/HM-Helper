import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionRouteResolver } from './action-route-resolver/action-route.resolver';
import { AnimalProductivityTriggers } from './animal-productivity/+state';
import { AnimalCreationComponent } from './animal-productivity/animal-creation/animal-creation.component';
import { AnimalDetailsComponent } from './animal-productivity/animal-details/animal-details.component';
import { AnimalProductivityComponent } from './animal-productivity/animal-productivity.component';

const routes: Routes = [
  {
    path: 'animal-productivity',
    component: AnimalProductivityComponent,
    data: {
      triggers: [AnimalProductivityTriggers.triggerLoadAnimals],
    },
    resolve: {
      triggers: ActionRouteResolver,
    },
  },
  {
    path: '',
    redirectTo: 'animal-productivity',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ActionRouteResolver],
})
export class AppRoutingModule {}
