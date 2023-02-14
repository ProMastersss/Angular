import {Injectable} from '@angular/core';
import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {Hero} from "../../types/hero";
import {AddHero, DeleteHero, GetHeroes, UpdateHero} from "./heroes.actions";
import {HeroService} from "../../services/hero.service";
import {tap} from "rxjs";
import {insertItem, patch, removeItem, updateItem} from "@ngxs/store/operators";

export interface HeroesStateModel {
  heroes: Hero[];
}

@State<HeroesStateModel>({
  name: 'heroes',
  defaults: {
    heroes: []
  }
})
@Injectable()
export class HeroesState implements NgxsOnInit {
  constructor(private heroService: HeroService) {
  }

  @Selector()
  static getHero(state: HeroesStateModel) {
    return (id: number) => state.heroes.find(hero => hero.id === id);
  }

  ngxsOnInit(ctx: StateContext<HeroesStateModel>) {
    ctx.dispatch(new GetHeroes());
  }

  @Action(GetHeroes)
  getHeroes({setState}: StateContext<HeroesStateModel>) {
    return this.heroService.getHeroes().pipe(tap(heroes => {
      setState({heroes});
    }));
  }

  @Action(AddHero)
  add({setState}: StateContext<HeroesStateModel>, {payload}: AddHero) {
    return this.heroService.addHero(payload).pipe(tap(() => {
      setState(
        patch<HeroesStateModel>({
          heroes: insertItem<Hero>(payload)
        })
      );
    }));
  }

  @Action(UpdateHero)
  update({setState}: StateContext<HeroesStateModel>, {payload}: UpdateHero) {
    return this.heroService.updateHero(payload).pipe(tap(() => {
      setState(
        patch<HeroesStateModel>({
          heroes: updateItem<Hero>(h => h?.id === payload.id, payload)
        })
      );
    }));
  }

  @Action(DeleteHero)
  delete({setState}: StateContext<HeroesStateModel>, {payload}: DeleteHero) {
    return this.heroService.deleteHero(payload).pipe(tap(() => {
      setState(
        patch<HeroesStateModel>({
          heroes: removeItem<Hero>(h => h?.id === payload.id)
        })
      );
    }));
  }
}
