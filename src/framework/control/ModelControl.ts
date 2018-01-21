import {BaseControl} from "./BaseControl";
import {BaseModel} from "../BaseModel";
import {Control} from "../interface/Control";

export class ModelControl<PropsT, StateT = void, ParentT extends Control<any> = Control<any>>
  extends BaseControl<PropsT, StateT, ParentT> {

  constructor(public readonly key: string,
              private _dispatch: Function) {
    super();
  }

  public updateFullProp(f: (newProps: PropsT) => PropsT): Promise<any> {
    return this._dispatch({
      type: this.key + BaseModel.SET_ACTION,
      handler: f
    });
  }
}
