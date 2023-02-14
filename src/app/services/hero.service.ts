import {Injectable} from '@angular/core';
import {Hero} from "../types/hero";
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AddMessage} from "../store/messages/messages.actions";
import {Store} from "@ngxs/store";
import {AppStore} from "../types/store";

interface Response<T> {
  data: T
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private store: Store) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Response<Hero[]>>(this.heroesUrl)
      .pipe(
        map(data => data.data),
        tap(_ => this.log('Fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put<null>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero ' + `id=${hero.id}`))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Response<Hero>>(this.heroesUrl, hero, this.httpOptions).pipe(
      map(data => data.data),
      tap(hero => this.log(`Add hero id=${hero.id}`)),
      catchError(this.handleError<any>('addHero ' + `id=${hero.id}`))
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete<null>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Delete hero id=${hero.id}`)),
      catchError(this.handleError<any>('deleteHero ' + `id=${hero.id}`))
    );
  }

  search(query: string) {
    if (!query.trim()) {
      return of([]);
    }

    const filteredHeroes = this.store.selectSnapshot<Hero[]>((state: AppStore) => state.heroes.heroes)
      .filter(hero => hero.name.match(new RegExp(query, "i")));

    if (filteredHeroes.length) {
      this.log(`found heroes matching "${query}"`);
    } else {
      this.log(`no heroes matching "${query}"`);
    }

    return of(filteredHeroes);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.store.dispatch(new AddMessage(`HeroService: ${message}`));
  }
}
