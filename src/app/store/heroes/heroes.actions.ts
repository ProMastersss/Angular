import {Hero} from "../../types/hero";

export class GetHeroes {
  static readonly type = '[Heroes] Get heroes';
}

export class GetHero {
  static readonly type = '[Heroes] Get hero';

  constructor(public payload: number) {
  }
}

export class AddHero {
  static readonly type = '[Heroes] Add hero';

  constructor(public payload: Hero) {
  }
}

export class UpdateHero {
  static readonly type = '[Heroes] Update hero';

  constructor(public payload: Hero) {
  }
}

export class DeleteHero {
  static readonly type = '[Heroes] Delete hero';

  constructor(public payload: Hero) {
  }
}
