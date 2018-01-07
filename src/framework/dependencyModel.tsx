import {BaseModel} from "./baseModel";
import {Dependency} from "./interface/dependency";
import {FetchWebService} from "./webService/fetchWebService";
import {Constants} from "./interface/constants";

export const DependencyModel: BaseModel<Dependency> = new BaseModel(Constants.DEPENDENCY,
  {
    webService: new FetchWebService()
  }
);
