import {Component, OnInit} from '@angular/core';
import {Hero} from '../../types/hero';
import {HeroService} from "../../services/hero.service";
import {HeroExtended} from "../../types/hero-extended";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  hideForm = false;

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  add(hero: HeroExtended) {
    this.heroService.addHero({name: hero.name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.hideForm = true;
      });
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
    this.heroService.deleteHero(hero)
      .subscribe();
  }
}
