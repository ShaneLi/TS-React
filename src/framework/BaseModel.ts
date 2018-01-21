export class BaseModel<T> {
  public static readonly SET_ACTION: string = "/SET_ACTION";

  public reducers: any =  {
    SET_ACTION: function (props: any, action: any) {
      return action.handler(props);
    }
  };

  constructor(public namespace: string,
              public state: T) {
  }
}
