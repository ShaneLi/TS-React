/*
 * Copyright (c) 2018. Xiangwen Li. All rights reserved.
 */

import {SelectionOption, SelectionOptionGroup} from "../selection/SelectionOption";

describe("Selection Option", () => {
  let group: SelectionOptionGroup = new SelectionOptionGroup("top");

  let groupa = group.add(new SelectionOptionGroup("a"));
  group.add(new SelectionOptionGroup("b"));
  let groupc = group.add(new SelectionOptionGroup("c"));

  groupa.add(new SelectionOption("1", 1));
  groupa.add(new SelectionOption("2", 2));

  let groupcd = groupc.add(new SelectionOptionGroup("d"));
  groupcd.add(new SelectionOption("e", "e"));

  it ("should provide correct search result", () => {
    expect(group.find(["a", "1"]).item).toEqual(1);
    expect(group.find(["a", "2"]).item).toEqual(2);

    expect(group.find(["c", "d", "e"]).item).toEqual("e");
  });

  it ("should return undefined for incomplete search path", () => {
    expect(group.find(["a"])).toBeUndefined();
    expect(group.find(["c", "d"])).toBeUndefined();
  });

  it ("should return invalid for wrong path", () => {
    expect(group.find(["a", "3"])).toBeUndefined();
    expect(group.find(["b", "1"])).toBeUndefined();
    expect(group.find(["h"])).toBeUndefined();
  })
});
