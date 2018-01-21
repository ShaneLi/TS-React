import {Dependency} from "../../../framework/interface/Dependency";
import {MockWebService} from "./MockWebService";

export class MockDependency implements Dependency {
  private _models: any = {};

  public get webService(): MockWebService {
    return this.define("webService", () => new MockWebService());
  }

  private define<T>(name: string, supplier: () => T): T {
    if (this._models[name] === undefined) {
      this._models[name] = supplier();
    }
    return this._models[name];
  }
}
