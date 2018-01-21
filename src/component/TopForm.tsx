import * as React from 'react';
import {TopControl, TopState} from "../control/TopControl";
import {ChildComponent} from "../framework/component/ChildComponents";
import {TopProp} from "../model/PageModel";
import {SubForm} from "./SubForm";
import {RenderResult} from "../framework/component/BaseComponent";

const style = require("./style/TopForm.less");

export class TopForm extends ChildComponent<TopControl, TopProp, TopState> {
  public doRender(control: TopControl, props: TopProp, state: TopState): RenderResult {
    return (
      <div className={style.childContainer}>
        <div className={style.textContainer}>
          Response: {
          this.state.response.map(post =>
            <div key={post.id} > Post{post.id} Title: {post.title}</div>
          )}
        </div>

        <div className={style.verticalContainer}>
          <div>Loaded: {this.control.loaded}</div>
          <div>Loading: {this.control.loading}</div>
          <div>Count: {this.state.count}</div>
        </div>

        <div className={style.verticalContainer}>
          <div className={style.button} onClick = {this.control.fetch}>Fetch</div>
          <div className={style.button} onClick = {this.control.post}>Post</div>
          <div className={style.button} onClick = {this.control.clear}>Clear</div>
        </div>

        <SubForm control = { control.subControl } />
      </div>
    );
  }
}
