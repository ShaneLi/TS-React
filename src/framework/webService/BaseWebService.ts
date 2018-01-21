import {RequestBuilder, RoutingConfig, WebService} from "../interface/WebService";

export class BaseWebService implements WebService {
  constructor(private _service: WebService,
              private _routing: RoutingConfig) {
  }

  public get(url: string): RequestBuilder {
    return this._service.get(url).withRouting(this._routing);
  }

  public post(url: string): RequestBuilder {
    return this._service.post(url).withRouting(this._routing);
  }

  public put(url: string): RequestBuilder {
    return this._service.put(url).withRouting(this._routing);
  }
}
