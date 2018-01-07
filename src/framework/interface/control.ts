import {ControlConnection} from "./connection";

export interface StateContainer<StateT> {
  state: StateT;
  setState(f: (prevState: StateT) => StateT, callback?: () => any): void;
}

export interface Control<PropT, StateT = any, ParentT extends Control<any> = Control<any, any, any>> {
  readonly prop: PropT;
  readonly parent: ParentT;
  readonly key: string;

  apply(prop: PropT): void;
  visitChildren<T>(f: (control: Control<any>) => T): Array<T>;

  setParent(parent: ControlConnection<any, PropT, ParentT>): void;
  attach(container: StateContainer<StateT>): void;

  initialState(): StateT;
  setState(state: StateT): void;
  updateState(f: (prevState: StateT) => StateT): void;
  updateFullState(f: (prevState: StateT) => StateT): void;
  updateStateAsync(f: (prevState: StateT) => StateT): Promise<any>;


  setProp(prop: PropT): Promise<any>;
  updateProp(f: (_: PropT) => PropT): Promise<any>;
  updateFullProp(f: (oldProp: PropT) => PropT): Promise<any>;
}
