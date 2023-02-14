import {HeroesStateModel, HeroesStateName} from "../store/heroes/heroes.state";
import {MessagesStateModel, MessagesStateName} from "../store/messages/messages.state";

export type AppStore = {
  [HeroesStateName]: HeroesStateModel,
  [MessagesStateName]: MessagesStateModel
};
