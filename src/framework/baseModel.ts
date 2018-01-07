export class BaseModel<T> {
  public static readonly SET_ACTION: string = "/SET_ACTION";

  constructor(public namespace: string,
              public state: T) {
  }

  public reducers: any =  {
    SET_ACTION: function (state: any, action: any) {
      return action.handler(state);
    }
  }
}
