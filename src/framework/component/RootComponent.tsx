import {RootProps} from "../control/RootControl";
import {BaseComponent} from "./BaseComponent";
import {Control} from "../interface/Control";

export abstract class RootComponent<
  ControlT extends Control<RootProps, StateT>,
  StateT = any>
  extends BaseComponent<ControlT, RootProps, RootProps, StateT>{

  constructor(props: RootProps) {
    super(props);

    this.control = this.createControl();
    this.control.attach(this);
    this.control.apply(props);
    this.state = this.control.initialState();
  }

  public componentWillReceiveProps(nextProps: RootProps, nextContext: any): void {
    this.control.apply(nextProps);
  }
  public abstract createControl(): ControlT;
}
