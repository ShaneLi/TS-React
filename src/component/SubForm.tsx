import * as React from 'react';
import {ChildComponent} from "../framework/component/childComponents";
import {SubControl} from "../control/subControl";

const style = require("./style/TopForm.less");

export class SubForm extends ChildComponent<SubControl> {
  protected doRender(control: SubControl, props: ControlProps<SubControl>, state: any): RenderResult {
    return undefined;
  }
  render() {
    return (
      <div className={style.childContainer}>
        <div className={style.textContainer}>
          Child Count: {this.control.props.count}
        </div>
        <div className={style.verticalContainer}>
          <div className={style.button} onClick = {this.control.increment}>Increment</div>
          <div className={style.button} onClick = {this.control.decrement}>Decrement</div>
        </div>
      </div>
    );
  };
}