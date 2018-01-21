import {BaseControl} from "./BaseControl";
import {Control} from "../interface/Control";

export abstract class ChildControl<PropsT, StateT = void, ParentT extends Control<any> = Control<any>>
  extends BaseControl<PropsT, StateT, ParentT> {

  public updateFullProp(f: (newProp: PropsT) => PropsT): Promise<any> {
    return this._parent.updateProp(f);
  }
}
