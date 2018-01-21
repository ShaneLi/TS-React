import {RootProps} from "../control/RootControl";
import {BaseComponent} from "./BaseComponent";
import {Control} from "../interface/Control";

export abstract class RootComponent<
  ControlT extends Control<PropsT, StateT>,
  PropsT = RootProps,
  StateT = any>
  extends BaseComponent<ControlT, PropsT, PropsT, StateT>{

  constructor(props: PropsT) {
    super(props);

    this.control = this.createControl(props);
    this.control.attach(this);
    this.control.apply(props);
    this.state = this.control.initialState();
  }

  public componentWillReceiveProps(nextProps: PropsT, nextContext: any): void {
    this.control.apply(nextProps);
  }
  public abstract createControl(props: PropsT): ControlT;
}
