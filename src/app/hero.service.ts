import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, Observable, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroSearchService {
  constructor(private http: HttpClient) {}

  leaker = new Subject();

  search(term: string): Observable<any> {
    return this.http
      .get(`api/heroes/?name=${term}`)
      .pipe(map((data: any) => data?.map((item: any) => item.name)));
  }
}
