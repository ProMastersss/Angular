import {Component} from '@angular/core';
import {Hero} from "../../types/hero";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Store} from "@ngxs/store";
import {UpdateHero} from "../../store/heroes/heroes.actions";
import {HeroesState} from "../../store/heroes/heroes.state";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent {
  hero: Hero | undefined;

  constructor(private route: ActivatedRoute, private store: Store, private location: Location) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.selectOnce(HeroesState.getHero)
      .pipe(map(filterFn => filterFn(id)))
      .subscribe(hero => {
        if (hero) {
          const {id, name} = hero;
          this.hero = {id, name};
        }
      });
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.hero) {
      this.store.dispatch(new UpdateHero(this.hero)).subscribe(() => this.goBack());
    }
  }
}
