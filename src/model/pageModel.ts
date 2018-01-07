import {BaseModel} from "../framework/baseModel";

export interface SubCount {
  count: number
}

export interface TopProp{
  readonly loading?: boolean;
  readonly loaded?: boolean;
  readonly subCount?: SubCount;
}

export const PageModel: BaseModel<TopProp> = new BaseModel("top",
  {loading: false, value: false, subCount: {count : 0}}
  );
