import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {AddMessage, ClearMessages} from './messages.actions';
import {append, patch} from "@ngxs/store/operators";

export interface MessagesStateModel {
  messages: string[];
}

export const MessagesStateName = 'messages';

@State<MessagesStateModel>({
  name: MessagesStateName,
  defaults: {
    messages: []
  }
})
@Injectable()
export class MessagesState {
  @Action(AddMessage)
  add({setState}: StateContext<MessagesStateModel>, {payload}: AddMessage) {
    setState(patch<MessagesStateModel>({
      messages: append<string>([payload])
    }));
  }

  @Action(ClearMessages)
  clear({setState}: StateContext<MessagesStateModel>) {
    setState(patch<MessagesStateModel>({
      messages: []
    }));
  }
}
