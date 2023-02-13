import {Component, EventEmitter, Output} from '@angular/core';
import {HeroExtended} from "../../types/hero-extended";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent {
  @Output() newHero = new EventEmitter<HeroExtended>;

  powerControl = new FormControl('');

  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  model = new HeroExtended(18, 'Dr. IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.model.power = this.powerControl.value as string;
    this.newHero.emit(this.model);
  }
}
