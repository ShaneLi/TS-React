import {Control} from "./control";

export interface PropConnection<ParentT, ChildT> {
  getValue(parent: ParentT): ChildT;
  setValue(parent: ParentT, child: ChildT): ParentT;
}

export interface ControlConnection<ParentT, ChildT,
  ControlT extends Control<ParentT> = Control<ParentT>> extends PropConnection<ParentT, ChildT> {
  readonly parent: ControlT;
  readonly child: Control<ChildT>;

  updateProp(f: (oldChild: ChildT) => ChildT): Promise<any>;
}
