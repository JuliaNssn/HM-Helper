import { CommonModule } from "@angular/common";
import { Injectable, NgModule } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";

type GlobalState = any;
export type ActionTrigger = (
  route: ActivatedRouteSnapshot,
  store: Store<GlobalState>
) => Action;
interface ActionResolverRouteData {
  triggers: ActionTrigger[];
}

@Injectable()
export class ActionRouteResolver implements Resolve<void> {
  constructor(private store: Store<GlobalState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void | Observable<void> | Promise<void> {
    if (!route.data.triggers || !route.data.triggers.length)
      throw new Error("No action trigger is present.");
    const { triggers } = route.data as ActionResolverRouteData;
    triggers
      .map((action) => action(route, this.store))
      .forEach((action) => this.store.dispatch(action));
  }
}

@NgModule({
  imports: [CommonModule],
  providers: [ActionRouteResolver],
})
export class SharedUtilsStateActionRouteResolverModule {}
