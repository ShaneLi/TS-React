import {ControlConnection} from "./Connection";

export interface StateContainer<StateT> {
  state: StateT;
  setState(f: (prevState: StateT) => StateT, callback?: () => any): void;
}

export interface Control<PropsT, StateT = any, ParentT extends Control<any> = Control<any, any, any>> {
  readonly props: PropsT;
  readonly parent: ParentT;
  readonly key: string;

  apply(props: PropsT): void;
  visitChildren<T>(f: (control: Control<any>) => T): Array<T>;

  setParent(parent: ControlConnection<any, PropsT, ParentT>): void;
  attach(container: StateContainer<StateT>): void;

  initialState(): StateT;
  setState(state: StateT): void;
  updateState(f: (prevState: StateT) => StateT): void;
  updateFullState(f: (prevState: StateT) => StateT): void;
  updateStateAsync(f: (prevState: StateT) => StateT): Promise<any>;

  setProps(props: PropsT): Promise<any>;
  updateProps(f: (_: PropsT) => PropsT): Promise<any>;
  updateFullProp(f: (oldProps: PropsT) => PropsT): Promise<any>;
}
