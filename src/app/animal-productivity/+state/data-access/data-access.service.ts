import { Injectable, NgModule } from "@angular/core";

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { Animal, AnimalEntity } from "./data-access.model";
import { Guid } from "guid-typescript";

@Injectable()
export class DataAccessService {
  basePath = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  public getAnimalEnities(): Observable<AnimalEntity[]> {
    return this.httpClient.get(`${this.basePath}/animalTypes`) as Observable<
      AnimalEntity[]
    >;
  }

  public getAllAnimals(): Observable<Animal[]> {
    return this.httpClient.get(`${this.basePath}/animals`) as Observable<
      Animal[]
    >;
  }

  public createAnimal(body: Animal): Observable<Animal> {
    const animal = {
      guid: Guid.create().toString(),
      ...body,
    };
    return this.httpClient.post(
      `${this.basePath}/animals`,
      animal
    ) as Observable<Animal>;
  }

  public updateAnimalById(body: Animal, guid: string): Observable<Animal> {
    return this.httpClient.put(
      `${this.basePath}/animals/${guid}`,
      body
    ) as Observable<Animal>;
  }

  public deleteAnimalById(guid: string): Observable<any> {
    return this.httpClient.delete(`${this.basePath}/animals/${guid}`);
  }
}

@NgModule({
  imports: [HttpClientModule],
  providers: [DataAccessService],
})
export class DataAccessServiceModule {}
