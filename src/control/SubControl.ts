import {ChildControl} from "../framework/control/ChildControl";
import {SubCount} from "../model/PageModel";
import {TopControl} from "./TopControl";
import {Bind} from "../framework/utils/Annotations";

export class SubControl extends ChildControl<SubCount, void, TopControl> {
  public readonly key: string = "subCount";

  @Bind
  public increment(): Promise<any> {
    return this.updateProps(oldProp => ({count: oldProp.count + 1}));
  }

  @Bind
  public decrement(): Promise<any> {
    return this.updateProps(oldProp => ({count: oldProp.count - 1}));
  }
}
