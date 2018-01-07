import {BaseControl} from "./baseControl";
import {BaseModel} from "../baseModel";
import {Control} from "../interface/control";

export class ModelControl<PropT, StateT, ParentT extends Control<any> = Control<any>>
  extends BaseControl<PropT, StateT, ParentT> {

  constructor(public readonly key: string,
              private _dispatch: Function) {
    super();
  }

  public updateFullProp(f: (newProp: PropT) => PropT): Promise<any> {
    return this._dispatch({
      type: this.key + BaseModel.SET_ACTION,
      handler: f
    });
  }
}
