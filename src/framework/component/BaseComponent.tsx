import * as React from "react";
import {Control} from "../interface/Control";
import {Bind} from "../utils/Annotations";

export type RenderResult = React.ReactNode;

export abstract class BaseComponent<
  ControlT extends Control<PropsT, StateT>, ComponentPropsT, PropsT, StateT = any>
  extends React.Component<ComponentPropsT, StateT> {
  protected control: ControlT = undefined;

  public render(): RenderResult {
    return this.doRender(this.control, this.control.props, this.state);
  }

  public abstract doRender(control: ControlT, props: PropsT, state: StateT): RenderResult;

  @Bind
  protected handler(handler: () => void): (e: React.MouseEvent<any>) => void {
    return (e: React.MouseEvent<any>) => {
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      handler();
    }
  }
}
