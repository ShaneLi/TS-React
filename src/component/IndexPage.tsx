import * as React from 'react';
import { connect } from 'dva';

import {RootComponent} from "../framework/component/RootComponent";
import {TopForm} from "./TopForm";
import {PageControl, PageProps} from "../control/PageControl";
import {Functions} from "../framework/utils/Functions";
import {RootProps} from "../framework/control/RootControl";
import {RenderResult} from "../framework/component/BaseComponent";

class Page extends RootComponent<PageControl, PageProps> {
  public createControl(props: PageProps): PageControl {
    return new PageControl(props);
  }

  public doRender(control: PageControl, props: RootProps, state: any): RenderResult {
    return (
      <div>
        <TopForm control = { control.topControl } />
      </div>
    );
  }
}
export default connect(Functions.identity)(Page);
