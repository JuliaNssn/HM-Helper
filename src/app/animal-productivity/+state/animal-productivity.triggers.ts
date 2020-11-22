import { ActionTrigger } from 'src/app/action-route-resolver/action-route.resolver';
import * as AnimalProductivityActions from './animal-productivity.actions';

export const triggerLoadAnimals: ActionTrigger = () =>
  AnimalProductivityActions.loadAnimals();
