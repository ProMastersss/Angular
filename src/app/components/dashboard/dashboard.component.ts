import {Component} from '@angular/core';
import {Hero} from "../../types/hero";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Select((state: any) => state.heroes.heroes.slice(-5)) heroes$!: Observable<Hero[]>;
}
