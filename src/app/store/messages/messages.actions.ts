export class ClearMessages {
  static readonly type = '[Messages] Clear messages';
}

export class AddMessage {
  static readonly type = '[Messages] Add message';

  constructor(public payload: string) {
  }
}
