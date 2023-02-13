import {Component, OnInit} from '@angular/core';
import {Hero} from "../../types/hero";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {HeroService} from "../../services/hero.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchQuery = new Subject<string>();

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroes$ = this.searchQuery.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.heroService.searchHeroes(query)),
    );
  }

  search(query: string) {
    this.searchQuery.next(query);
  }
}
