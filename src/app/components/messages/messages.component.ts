import {Component} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ClearMessages} from "../../store/messages/messages.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  @Select((state: any) => state.messages.messages) messages$!: Observable<string[]>;

  constructor(public store: Store) {
  }

  clear() {
    this.store.dispatch(new ClearMessages())
  }
}
