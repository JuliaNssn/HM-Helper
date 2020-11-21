import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AnimalProductivityFacade } from "./+state/animal-productivity.facade";
import { Animal, AnimalEntity } from "./+state/data-access/data-access.model";

@Component({
  selector: "animal-productivity",
  templateUrl: "./animal-productivity.component.html",
  styleUrls: ["./animal-productivity.component.scss"],
})
export class AnimalProductivityComponent {
  animals$: Observable<Animal[]> = this.facade.animals$;
  animalEntities$: Observable<AnimalEntity[]> = this.facade.animalEntities$;
  selectedAnimal$: Observable<Animal> = this.facade.selectedAnimal$;

  constructor(private facade: AnimalProductivityFacade) {}
}
