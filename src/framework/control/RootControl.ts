import {BaseControl} from "./BaseControl";
import {Dependency} from "../interface/Dependency";

export interface RootProps {
  dependency: Dependency;
  dispatch: Function;
}

export class RootControl<PropsT extends RootProps, StateT = void> extends BaseControl<PropsT, StateT> {
  public readonly key: string = "";

  public updateFullProp(f: (oldProp: PropsT) => PropsT): Promise<any> {
    throw new Error("Root control does not have value property");
  }
}
