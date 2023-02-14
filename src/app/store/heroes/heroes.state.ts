import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {Hero} from "../../types/hero";
import {AddHero, DeleteHero, UpdateHero} from "./heroes.actions";
import {HeroService} from "../../services/hero.service";
import {tap} from "rxjs";
import {insertItem, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {isPlatformServer} from "@angular/common";
import {makeStateKey, TransferState} from "@angular/platform-browser";

export interface HeroesStateModel {
  heroes: Hero[];
}

export const HeroesStateName = 'heroes';

export const STATE_KEY = makeStateKey<Hero[]>('heroesState');

@State<HeroesStateModel>({
  name: HeroesStateName,
  defaults: {
    heroes: []
  }
})
@Injectable()
export class HeroesState implements NgxsOnInit {
  // @ts-ignore
  constructor(@Inject(PLATFORM_ID) private platformId, private transferState: TransferState, private heroService: HeroService) {
  }

  @Selector()
  static getHero(state: HeroesStateModel) {
    return (id: number) => state.heroes.find(hero => hero.id === id);
  }

  ngxsOnInit(ctx: StateContext<HeroesStateModel>) {
    if (isPlatformServer(this.platformId)) {
      this.heroService.getHeroes().subscribe((heroes) => {
        this.transferState.set(STATE_KEY, heroes);
        ctx.setState(patch<HeroesStateModel>({heroes}));
      });
    } else if (this.transferState.hasKey(STATE_KEY)) {
      ctx.setState({heroes: this.transferState.get(STATE_KEY, [])});
      this.transferState.remove(STATE_KEY);
    }
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
