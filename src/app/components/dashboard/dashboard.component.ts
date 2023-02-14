import {Component} from '@angular/core';
import {Hero} from "../../types/hero";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";
import {AppStore} from "../../types/store";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Select((state: AppStore) => state.heroes.heroes.slice(-5)) heroes$!: Observable<Hero[]>;
}
