import {BaseModel} from "../../../framework/BaseModel";
import {RootProps} from "../../../framework/control/RootControl";
import {
  isEmptyArray, isEmptyString, isFunction, isPresent
} from "../../../framework/utils/CommonFunctions";
import {Control, StateContainer} from "../../../framework/interface/Control";
import {ModelControl} from "../../../framework/control/ModelControl";
import {ChildControl} from "../../../framework/control/ChildControl";
import {Bind} from "../../../framework/utils/Annotations";
import {MockDependency} from "./MockDependency";

interface DispatchCall {
  type: string;
  handler: (newProp: any) => any
}

class Command {
  constructor(public handler: Function,
              public promise: Promise<any>) {
  }
}

class StateHolder implements StateContainer<any> {
  public state: any = {};

  constructor(private _model: MockModel) {}

  public setState(f: (prevState: any) => any, callback?: () => any): void {
    let outResolve: Function;
    let promise = new Promise(resolve => outResolve = resolve);

    this._model.addCommand(new Command(() => {
      this.state = f(this.state);
      if (isFunction(callback)) {
        callback();
      }
      outResolve();
    }, promise));
  }
}


export class MockModel extends BaseModel<any> implements RootProps {
  public dependency: MockDependency = new MockDependency();

  private _commandQueue: Array<Command> = [];
  private _stateMap: Map<Control<any, any>, StateHolder>
    = new Map<Control<any, any>, StateHolder>();

  private _rootControl: Control<any, any>;
  private _value: any;

  constructor() {
    super("", undefined)
  }

  private static getModelName(type: string): string {
    let result = type.replace(BaseModel.SET_ACTION, "");
    if (result.length === type.length) {
      fail("invalid type " + type);
    }
    return result
  }

  @Bind
  public dispatch(call: DispatchCall): Promise<any> {
    let model = MockModel.getModelName(call.type);
    let outResolve: Function;
    let promise = new Promise(resolve => outResolve = resolve);

    this._commandQueue.push(new Command(() => {
      if (isEmptyString(model)) {
        this._value = call.handler(this._value);
      } else {
        this._value[model] = call.handler(this._value[model]);
      }

      outResolve();
    }, promise));
    return promise;
  }

  public attachControl(control: Control<any>,
                       initialProp: any = {}): void {
    if (control instanceof ChildControl) {
      let childControl = <ChildControl<any>> control;
      this.attachChildControl(childControl.key, childControl, initialProp);
    } else {
      this.attachModelControl(control, initialProp);
    }
  }

  public attachModelControl(control: Control<any>,
                            initialProp: any = {} as any): void {
    this._rootControl = control;

    Object.assign(this, initialProp);
    this._value = this;
    this.attachSubControl(control);

    this.applyValue();
  }

  public attachChildControl<T>(key: string,
                               control: Control<T, any>,
                               initialProp: T = {} as any) {
    let root = new ModelControl("", this.dispatch.bind(this));
    root.addControl(control);
    this._rootControl = root;

    this._value = {};
    this._value[key] = initialProp;

    this.attachSubControl(control);
    this.applyValue();
  }

  public getState<T>(control: Control<any, T>): T {
    return this._stateMap.get(control).state;
  }

  public addCommand(command: Command): void {
    this._commandQueue.push(command);
  }

  public dispatchOne(): void {
    let command = this._commandQueue.shift();

    if (isPresent(command)) {
      command.handler();
    }
    this.applyValue();
  }

  public async dispatchAllExisting(): Promise<any> {
    let oldQueue: Array<Command> = this._commandQueue;
    this._commandQueue = [];

    let result = Promise.all(oldQueue.map(command => command.promise));
    oldQueue.forEach(command => command.handler());
    this.applyValue();
    return result;
  }

  public async dispatchAll(): Promise<any> {
    while (!isEmptyArray(this._commandQueue)) {
      await this.dispatchAllExisting();
    }
  }

  private applyValue() {
    this._rootControl.apply(this._value);
  }

  private attachSubControl(control: Control<any, any>): void {
    let stateHolder = new StateHolder(this);
    stateHolder.state = control.initialState();
    this._stateMap.set(control, stateHolder);
    control.attach(stateHolder);

    control.visitChildren(child =>
      this.attachSubControl(child)
    )
  }
}
