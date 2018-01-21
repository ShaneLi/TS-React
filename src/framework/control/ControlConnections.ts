import {Control} from "../interface/Control";
import {ControlConnection, PropConnection} from "../interface/Connection";

export abstract class BaseControlConnection<ParentT, ChildT,
  ControlT extends Control<ParentT> = Control<ParentT>>
  implements ControlConnection<ParentT, ChildT, ControlT>{

  constructor(public readonly parent: ControlT,
              public readonly child: Control<ChildT>) {
  }

  public async updateProp(f: (oldChild: ChildT) => ChildT): Promise<any> {
    return this.parent.updateProps(oldParentT =>
      this.setValue(this.parent.props, f(this.getValue(oldParentT)))
    )
  }

  public abstract getValue(parent: ParentT): ChildT;
  public abstract setValue(parent: ParentT, child: ChildT): ParentT;
}

export class Connections {
  public static byKey<ParentT, ChildT, ControlT extends Control<ParentT>>(parent: ControlT,
                                                                          child: Control<ChildT>,
                                       key: string): BaseControlConnection<ParentT, ChildT, ControlT> {
    return new KeyBasedControlConnection(key, parent, child);
  }

  public static byConnection<ParentT, ChildT, ControlT extends Control<ParentT>>(
    parent: ControlT,
    child: Control<ChildT, any>,
    connection: PropConnection<ParentT, ChildT>
  ): BaseControlConnection<ParentT, ChildT, ControlT> {
    return new DelegatingControlConnection(parent, child, connection);
  }
}

class DelegatingControlConnection<ParentT, ChildT, ControlT extends Control<ParentT>>
  extends BaseControlConnection<ParentT, ChildT, ControlT> {
  constructor(parent: ControlT,
              child: Control<ChildT, any>,
              private _connection: PropConnection<ParentT, ChildT>) {
    super(parent, child);
  }

  public getValue(parent: ParentT): ChildT {
    return this._connection.getValue(parent);
  }

  public setValue(parent: ParentT, child: ChildT): ParentT {
    return this._connection.setValue(parent, child);
  }
}

class KeyBasedControlConnection<ParentT, ChildT, ControlT extends Control<ParentT>>
  extends BaseControlConnection<ParentT, ChildT, ControlT> {

  constructor(public readonly key: string,
              parent: ControlT,
              child: Control<ChildT, any>) {
    super(parent, child)
  }

  public getValue(parent: ParentT): ChildT {
    return parent[this.key]
  }

  public setValue(parent: ParentT, child: ChildT): ParentT {
    let update: any = {};
    update[this.key] = child;
    return Object.assign({}, parent, update)
  }
}
