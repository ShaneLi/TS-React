import {Connections, BaseControlConnection} from "./controlConnections";
import {Control, StateContainer} from "../interface/control";
import {PropConnection} from "../interface/connection";
import {isPresent} from "../utils/common";

export abstract class BaseControl<PropT, StateT = void, ParentT extends Control<any> = Control<any>>
  implements Control<PropT, StateT, ParentT> {

  protected _prop: PropT = undefined;
  protected _parent: BaseControlConnection<any, PropT, ParentT> = undefined;
  protected _children: Array<BaseControlConnection<PropT, any>> = [];
  protected _container: StateContainer<StateT> = undefined;

  public apply(prop: PropT): void {
    this._prop = prop;
    this._children.forEach(connection => {
      connection.child.apply(connection.getValue(prop))
    });
  }

  public get prop(): PropT {
    return this._prop;
  }

  public get parent(): ParentT {
    return isPresent(this._parent) ? this._parent.parent : undefined;
  }

  public addControl<T extends Control<any>>(control: T, key?: string): T {
    let connection: BaseControlConnection<PropT, any> =
      Connections.byKey(this, control, isPresent(key) ? key : control.key);

    control.setParent(connection);
    this._children.push(connection);
    return control;
  }

  public addChild<ChildT, ControlT extends Control<any>>(connection: PropConnection<PropT, ChildT>,
                                                         control: ControlT): ControlT {
    let controlConnection: BaseControlConnection<PropT, ChildT> = Connections.byConnection(this, control, connection);
    control.setParent(controlConnection);
    this._children.push(controlConnection);
    return control;
  }

  public visitChildren<T>(f: (control: Control<any, any>) => T): Array<T> {
    return this._children.map(child => f(child.child));
  }

  public setParent(parent: BaseControlConnection<any, PropT, ParentT>): void {
    this._parent = parent;
  }

  public attach(container: StateContainer<StateT>): void {
    this._container = container;
  }

  public updateStateAsync(f: (prevState: StateT) => StateT): Promise<any> {
    return new Promise<any>(resolve => {
        this._container.setState(prevState =>
          Object.assign({}, prevState, f(prevState)
        ), () => resolve())
    });
  }

  public updateState(f: (prevState: StateT) => StateT): void {
    this._container.setState(prevState =>
      Object.assign({}, prevState, f(prevState))
    )
  }

  public updateFullState(f: (prevState: StateT) => StateT): void {
    this._container.setState(f);
  }

  public setState(state: StateT): void {
    this._container.setState(() => state);
  }

  public initialState(): StateT {
    return {} as any;
  }

  public setProp(prop: PropT): Promise<any> {
    return this.updateFullProp((oldProp: PropT) =>
      Object.assign({}, oldProp, prop)
    );
  }

  public updateProp(f: (_: PropT) => PropT): Promise<any> {
    return this.updateFullProp((oldProp: PropT) =>
      Object.assign({}, oldProp, f(oldProp))
    );
  }

  public abstract updateFullProp(f: (oldProp: PropT) => PropT): Promise<any>;
  public abstract readonly key: string;
}
