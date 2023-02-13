import {Component, Input} from '@angular/core';
import {Hero} from "../../types/hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../services/hero.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent {
  @Input() hero?: Hero;

  constructor(private route: ActivatedRoute, private heroesService: HeroService, private location: Location) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroesService.getHero(id).subscribe(hero => {
      this.hero = hero;
    })
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.hero) {
      this.heroesService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
