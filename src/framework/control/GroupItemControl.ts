import {Control} from "../interface/Control";
import {WithId} from "../interface/WithId";
import {ChildControl} from "./ChildControl";

export class GroupItemControl<PropsT extends WithId, StateT = void,
  ParentT extends Control<any> = Control<any>>
  extends ChildControl<PropsT, StateT, ParentT> {

  public readonly key: string = "";


}
