import {isEmptyArray, isEmptyString} from "../utils/CommonFunctions";
import {RoutingConfig} from "../interface/WebService";
import {Strings} from "../utils/Strings";

class BasicRoutingConfig implements RoutingConfig {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = isEmptyString(baseUrl) ? "" : Strings.ensureTrailing(baseUrl, "/");
  }

  public getUrl(method: string, params: Array<string>): string {
    if (!isEmptyArray(params)) {
      throw new Error("Parameter is not supported by basic Routing config")
    }
    return this._baseUrl + method;
  }
}

export class RoutingConfigs {
  public static EMPTY = new BasicRoutingConfig("");

  public static withBase(base: string): RoutingConfig {
    return new BasicRoutingConfig(base);
  }
}
