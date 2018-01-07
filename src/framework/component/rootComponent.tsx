import {RootControl, RootProps} from "../control/rootControl";
import {BaseComponent} from "./baseComponent";

export abstract class RootComponent<
  ControlT extends RootControl<PropT, StateT>,
  PropT extends RootProps,
  StateT = any>
  extends BaseComponent<ControlT, PropT, StateT>{

  public componentWillMount(): void {
    this.control = this.createControl();
    this.control.attach(this);
    this.state = this.control.initialState();

    this.control.apply(this.props);
  }

  public componentWillReceiveProps(nextProps: PropT, nextContext: any): void {
    this.control.apply(nextProps);
  }

  public abstract createControl(): ControlT;
}
