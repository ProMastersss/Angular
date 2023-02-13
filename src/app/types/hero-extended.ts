import {Hero} from "./hero";

export class HeroExtended implements Hero {
  constructor(public id: number,
              public name: string,
              public power: string,
              public alterEgo?: string) {
  }

}
