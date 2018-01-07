import {Dependency} from "../../../framework/interface/dependency";
import {MockWebService} from "./mockWebService";

export class MockDependency implements Dependency {
  private _models: any = {};

  private define<T>(name: string, supplier: () => T): T {
    if (this._models[name] === undefined) {
      this._models[name] = supplier();
    }
    return this._models[name];
  }

  public get webService(): MockWebService {
    return this.define("webService", () => new MockWebService());
  }
}
