import {BaseComponent} from "./baseComponent";
import {Control} from "../interface/control";

export interface ControlProps<T extends Control<any>> {
  control: T;
}

export abstract class ChildComponent<ControlT extends Control<any, StateT>, StateT = any>
  extends BaseComponent<ControlT, ControlProps<ControlT>, StateT> {

  constructor(props: ControlProps<ControlT>, context: any) {
    super(props, context);
    this.control = props.control;
  }

  public componentWillMount(): void {
    this.state = this.control.initialState();
    this.control.attach(this);
  }
}
