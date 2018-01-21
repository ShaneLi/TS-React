import {BaseModel} from "./BaseModel";
import {Dependency} from "./interface/Dependency";
import {FetchWebService} from "./webService/FetchWebService";
import {Constants} from "./interface/Constants";

export const DependencyModel: BaseModel<Dependency> = new BaseModel(Constants.DEPENDENCY,
  {
    webService: new FetchWebService()
  }
);
