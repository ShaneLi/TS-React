/*
 * Copyright (c) 2018. Xiangwen Li. All rights reserved.
 */

export abstract class AbstractControlConnection<ParentT, ChildT> {
  constructor(public readonly parent: BaseControl<ParentT>,
              public readonly child: BaseControl<ChildT>,) {
  }

  public abstract getProp(parent: ParentT): ChildT;

  public dispatchUpdate(update: ChildT): Promise<any> {
    return this.parent.dispatchUpdate(
      this.getUpdatedProp(this.parent.prop, update)
    )
  }

  protected abstract getUpdatedProp(parent: ParentT, self: ChildT): ParentT;
}

class ControlConnection<ParentT, SelfT> extends AbstractControlConnection<ParentT, SelfT> {
  constructor(public readonly key: string,
              parent: BaseControl<ParentT>,
              child: BaseControl<SelfT>) {
    super(parent, child);
  }

  public getProp(parent: ParentT): SelfT {
    return parent[this.key];
  }

  public getUpdatedProp(parent: ParentT, self: SelfT): ParentT {
    let update: any = {};
    update[this.key] = self;
    return Object.assign({}, parent, update);
  }
}

export abstract class BaseControl<T> {
  protected _parent: AbstractControlConnection<any, T> = undefined;
  protected _children: Array<AbstractControlConnection<T, any>> = [];

  protected _prop: T = undefined;

  public get prop(): T {
    return this._prop;
  }

  public apply(prop: T): void {
    this._prop = prop;

    this._children.forEach(connection => {
      connection.child.apply(connection.getProp(prop))
    });
  }

  public abstract async dispatchUpdate(newState: T): Promise<any>;

  protected addChild(key: string, model: ChildControl<any>): void {
    let connection: ControlConnection<T, any> = new ControlConnection<T, any>(key, this, model);
    this._children.push(connection);
    model.setParent(connection);
  }

  protected setParent(parent: ControlConnection<any, T>) {
    this._parent = parent;
  }
}

class RootControl<T> extends BaseControl<T> {
  constructor(initialState: T,
              private _nameSpace: string,
              private _dispatch: Function) {
    super();
    this._prop = initialState;
  }

  public async dispatchUpdate(newProp: T): Promise<any> {
    return this._dispatch({
      type: this._nameSpace + '/SET_PROP',
      prop: newProp
    });
  }
}

class ChildControl<T> extends BaseControl<T> {
  public async dispatchUpdate(newState: T): Promise<any> {
    this._parent.dispatchUpdate(newState);
  }
}
