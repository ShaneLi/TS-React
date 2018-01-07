import * as React from 'react';
import { connect } from 'dva';

import {RootComponent} from "../framework/component/rootComponent";
import {SubForm} from "./subForm";
import {TopForm} from "./topForm";
import {PageControl, PageProps} from "../control/pageControl";

class Page extends RootComponent<PageControl, PageProps> {
  public createControl(): PageControl {
    return new PageControl(this.props);
  }

  render() {
    return (
      <div>
        <TopForm control = { this.control.topControl } />
        <SubForm control = { this.control.topControl.subControl } />
      </div>
    );
  };
}
export default connect(data => data)(Page);
