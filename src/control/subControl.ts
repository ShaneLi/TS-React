import {ChildControl} from "../framework/control/childControl";
import {SubCount} from "../model/pageModel";
import {TopControl} from "./topControl";
import {Bind} from "../framework/utils/annotations";

export class SubControl extends ChildControl<SubCount, void, TopControl> {
  public readonly key: string = "subCount";

  @Bind
  public increment(): Promise<any> {
    return this.updateProp(oldProp => ({count: oldProp.count + 1}));
  }

  @Bind
  public decrement(): Promise<any> {
    return this.updateProp(oldProp => ({count: oldProp.count - 1}));
  }
}
