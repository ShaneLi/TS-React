import {RootControl, RootProps} from "../framework/control/RootControl";
import {PageModel, TopProp} from "../model/PageModel";
import {TopControl} from "./TopControl";

export interface PageProps extends RootProps {
  top: TopProp
}

export class PageControl extends RootControl<PageProps, void> {
  public topControl: TopControl;

  constructor(props: PageProps) {
    super();

    this.topControl = this.addControl(new TopControl(PageModel, props))
  }
}
