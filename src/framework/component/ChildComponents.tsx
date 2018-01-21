import {BaseComponent} from "./BaseComponent";
import {Control} from "../interface/Control";

export interface ControlProps<T extends Control<any>> {
  control: T;
}

export abstract class ChildComponent<ControlT extends Control<PropsT, StateT>, PropsT, StateT = any>
  extends BaseComponent<ControlT, ControlProps<ControlT>, PropsT, StateT> {

  constructor(props: ControlProps<ControlT>, context: any) {
    super(props, context);
    this.control = props.control;
    this.state = this.control.initialState();
    this.control.attach(this);
  }
}
