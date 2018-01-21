/*
 * Copyright (c) 2018. Xiangwen Li. All rights reserved.
 */

import {Control} from "../interface/Control";
import {BaseComponent, RenderResult} from "./BaseComponent";
import {ControlProps} from "./ChildComponents";

export interface ControlArrayItemProps<PropsT, ControlT extends Control<PropsT>> extends ControlProps<ControlT> {
  readonly value: PropsT
}

export abstract class ControlArrayItemComponent<ControlT extends Control<PropsT>, PropsT>
  extends BaseComponent<ControlT, ControlArrayItemProps<PropsT, ControlT>, PropsT> {

  constructor(props: ControlArrayItemProps<PropsT, ControlT>) {
    super(props);

    this.control = props.control;
  }

  public render(): RenderResult {
    return this.doRender(this.control, this.props.value, this.state);
  }
}
