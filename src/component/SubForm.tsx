import * as React from 'react';
import {ChildComponent} from "../framework/component/ChildComponents";
import {SubControl} from "../control/SubControl";
import {RenderResult} from "../framework/component/BaseComponent";
import {SubCount} from "../model/PageModel";

const style = require("./style/TopForm.less");

export class SubForm extends ChildComponent<SubControl, SubCount> {
  doRender(control: SubControl, props: SubCount, state: any): RenderResult {
    return (
      <div className={style.childContainer}>
        <div className={style.textContainer}>
          Child Count: {props.count}
        </div>
        <div className={style.verticalContainer}>
          <div className={style.button} onClick = {control.increment}>Increment</div>
          <div className={style.button} onClick = {control.decrement}>Decrement</div>
        </div>
      </div>
    );
  }
}
