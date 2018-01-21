import {Connections, BaseControlConnection} from "./ControlConnections";
import {Control, StateContainer} from "../interface/Control";
import {PropConnection} from "../interface/Connection";
import {isPresent} from "../utils/CommonFunctions";

export abstract class BaseControl<PropsT, StateT = void, ParentT extends Control<any> = Control<any>>
  implements Control<PropsT, StateT, ParentT> {

  public abstract readonly key: string;
  protected _children: Array<BaseControlConnection<PropsT, any>> = [];
  protected _container: StateContainer<StateT> = undefined;
  protected _parent: BaseControlConnection<any, PropsT, ParentT> = undefined;

  public get parent(): ParentT {
    return isPresent(this._parent) ? this._parent.parent : undefined;
  }

  protected _props: PropsT = undefined;

  public get props(): PropsT {
    return this._props;
  }

  protected get state(): StateT {
    return isPresent(this._container) ? this._container.state : undefined;
  }

  public apply(props: PropsT): void {
    this._props = props;
    this._children.forEach(connection => {
      connection.child.apply(connection.getValue(props))
    });
  }

  public addControl<T extends Control<any>>(control: T, key?: string): T {
    let connection: BaseControlConnection<PropsT, any> =
      Connections.byKey(this, control, isPresent(key) ? key : control.key);

    control.setParent(connection);
    this._children.push(connection);
    return control;
  }

  public addChild<ChildT, ControlT extends Control<any>>(connection: PropConnection<PropsT, ChildT>,
                                                         control: ControlT): ControlT {
    let controlConnection: BaseControlConnection<PropsT, ChildT> = Connections.byConnection(this, control, connection);
    control.setParent(controlConnection);
    this._children.push(controlConnection);
    return control;
  }

  public visitChildren<T>(f: (control: Control<any, any>) => T): Array<T> {
    return this._children.map(child => f(child.child));
  }

  public setParent(parent: BaseControlConnection<any, PropsT, ParentT>): void {
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

  public setProps(props: PropsT): Promise<any> {
    return this.updateFullProp((oldProp: PropsT) =>
      Object.assign({}, oldProp, props)
    );
  }

  public updateProps(f: (_: PropsT) => PropsT): Promise<any> {
    return this.updateFullProp((oldProps: PropsT) =>
      Object.assign({}, oldProps, f(oldProps))
    );
  }

  public abstract updateFullProp(f: (oldProps: PropsT) => PropsT): Promise<any>;
}
