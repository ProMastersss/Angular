import {Component} from '@angular/core';
import {Hero} from '../../types/hero';
import {HeroExtended} from "../../types/hero-extended";
import {Select, Store} from "@ngxs/store";
import {AddHero, DeleteHero} from "../../store/heroes/heroes.actions";
import {Observable} from "rxjs";
import {AppStore} from "../../types/store";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  @Select((state: AppStore) => state.heroes.heroes) heroes$!: Observable<Hero[]>;
  hideForm = false;

  constructor(private store: Store) {
  }

  add(hero: HeroExtended) {
    this.hideForm = true;
    this.store.dispatch(new AddHero({name: hero.name} as Hero))
      .subscribe(() => {
        this.hideForm = false;
      });
  }

  delete(hero: Hero) {
    this.hideForm = true;
    this.store.dispatch(new DeleteHero(hero)).subscribe(() => {
      this.hideForm = false;
    });
  }
}
