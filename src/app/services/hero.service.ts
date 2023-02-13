import {Injectable} from '@angular/core';
import {Hero} from "../types/hero";
import {catchError, Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

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

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Response<Hero[]>>(this.heroesUrl)
      .pipe(
        map(data => data.data),
        tap(_ => this.log('Fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Response<Hero>>(url).pipe(
      map(data => data.data),
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
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
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Delete hero id=${hero.id}`)),
      catchError(this.handleError<any>('deleteHero ' + `id=${hero.id}`))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Response<Hero[]>>(`${this.heroesUrl}/?name=${term}`).pipe(
      map(d => d.data),
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
