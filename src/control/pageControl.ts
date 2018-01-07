import {RootControl, RootProps} from "../framework/control/rootControl";
import {PageModel, TopProp} from "../model/pageModel";
import {TopControl} from "./topControl";

export interface PageProps extends RootProps {
  top: TopProp
}

export class PageControl extends RootControl<PageProps, void> {
  public topControl: TopControl;

  constructor(prop: PageProps) {
    super(prop);

    this.topControl = this.addControl(new TopControl(PageModel, this.prop))
  }
}
