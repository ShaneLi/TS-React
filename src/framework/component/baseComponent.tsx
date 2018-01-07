import * as React from "react";
import {Control} from "../interface/control";
import {Bind} from "../utils/common";

export abstract class BaseComponent<ControlT extends Control<PropT, StateT>, PropT, StateT = any>
  extends React.Component<PropT, StateT> {
  protected control: ControlT = undefined;

  @Bind
  protected handler(handler: () => void): (e: React.MouseEvent<any>) => void {
    return (e: React.MouseEvent<any>) => {
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      handler();
    }
  }
}
