import {RequestInit, Response} from "dva/fetch";
const fetch: (_: any, _2: any) => Promise<Response> = require("dva/fetch");

import {isPresent} from "../utils/CommonFunctions";
import {Functions} from "../utils/Functions";
import {RequestBuilder, RoutingConfig, WebService} from "../interface/WebService";

class FetchRequestBuilder implements RequestBuilder {
  public static CONTENT_TYPE: string = "Content-type";
  public static JSON_TYPE: string = "application/json; charset=UTF-8";
  private _info: RequestInit;
  private _params: Array<string>;
  private _routing: RoutingConfig;

  constructor(method: string,
              private _url: string) {
    this._info = {
      method: method,
      cache: "no-cache",
      headers: {}
    };
  }

  private static async checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error: Error = new Error(response.statusText);
      error.message = await response.text();
      throw error;
    }
  };

  private static failed<T>(error: any): T {
    throw error
  };

  public withParams(...params: Array<string>): RequestBuilder {
    this._params = params;
    return this;
  }

  public withRouting(routing: RoutingConfig): RequestBuilder {
    this._routing = routing;
    return this;
  }

  public withData<T>(data: any, converter: (_: T) => any): RequestBuilder {
    let converted = isPresent(converter) ? converter(data) : data;
    this._info.body = JSON.stringify(converted);
    let headers: any = this._info.headers;
    headers[FetchRequestBuilder.CONTENT_TYPE] = FetchRequestBuilder.JSON_TYPE;
    return this;
  }

  public call<T>(converter: (any: any) => T = Functions.identity): Promise<T> {
    let url = isPresent(this._routing) ? this._routing.getUrl(this._url, this._params) : this._url;
    return fetch(url, this._info)
      .then(FetchRequestBuilder.checkStatus)
      .then(response => response.json().then(converter))
      .catch<T>(FetchRequestBuilder.failed)
  }
}

export class FetchWebService implements WebService {
  public get(url: string): RequestBuilder {
    return new FetchRequestBuilder(
      "GET",
      url
    );
  }

  public post(url: string): RequestBuilder {
    return new FetchRequestBuilder(
      "POST",
      url
    )
  }

  public put(url: string): RequestBuilder {
    return new FetchRequestBuilder(
      "PUT",
       url
    );
  }
}
