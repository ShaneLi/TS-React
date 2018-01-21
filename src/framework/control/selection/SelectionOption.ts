/*
 * Copyright (c) 2018. Xiangwen Li. All rights reserved.
 */

import {isPresent} from "../../utils/CommonFunctions";

abstract class SelectionOptionNode {
  constructor(public readonly id: string,
              public readonly label: string) {
  }

  public abstract find(ids: Array<string>, index: number): SelectionOption;
}


export class SelectionOptionGroup extends SelectionOptionNode{
  public readonly options: Array<SelectionOptionNode> = [];
  private _optionMap: Map<string, SelectionOptionNode> = new Map<string, SelectionOptionNode>();

  constructor(id: string,
              label: string = id) {
    super(id, label);
  }

  public add<T extends SelectionOptionNode>(option: T): T {
    this.options.push(option);
    this._optionMap.set(option.id, option);
    return option;
  }

  public find(ids: Array<string>, index: number = 0): SelectionOption {
    let option = this._optionMap.get(ids[index]);
    if (isPresent(option)) {
      return option.find(ids, index + 1);
    }
    return undefined;
  }
}

export class SelectionOption extends SelectionOptionNode {
  constructor(id: string,
              public readonly item: any,
              label: string = id) {
    super(id, label);
  }

  public find(ids: Array<string>, index: number): SelectionOption {
    if (index === ids.length) {
      return this;
    }
    return undefined;
  }
}

export class SelectionActionOption {
  static DELETE: SelectionActionOption = new SelectionActionOption("删除");
  public readonly option: SelectionOption;

  constructor(public readonly name: string) {
    this.option = new SelectionOption(name, this);
  }
}
