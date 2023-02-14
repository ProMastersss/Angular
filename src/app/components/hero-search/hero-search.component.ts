import {Component} from '@angular/core';
import {Hero} from "../../types/hero";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent {
  heroes$!: Observable<Hero[]>;
  private searchQuery = new Subject<string>();

  constructor(private heroService: HeroService) {
    this.heroes$ = this.searchQuery.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.heroService.search(query))
    );
  }

  search(query: string) {
    this.searchQuery.next(query);
  }
}
