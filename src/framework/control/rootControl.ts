import {BaseControl} from "./baseControl";
import {Dependency} from "../interface/dependency";

export interface RootProps {
  dependency: Dependency;
  dispatch: Function;
}

export class RootControl<PropT extends RootProps, StateT> extends BaseControl<PropT, StateT> {
  public readonly key: string = "";
  constructor(prop: PropT) {
    super();
    this.apply(prop);
  }

  public updateFullProp(f: (oldProp: PropT) => PropT): Promise<any> {
    throw new Error("Root control does not have value property");
  }
}
