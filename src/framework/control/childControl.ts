import {BaseControl} from "./baseControl";
import {Control} from "../interface/control";

export abstract class ChildControl<PropT, StateT = void, ParentT extends Control<any> = Control<any>>
  extends BaseControl<PropT, StateT, ParentT> {

  public updateFullProp(f: (newProp: PropT) => PropT): Promise<any> {
    return this._parent.updateProp(f);
  }
}
