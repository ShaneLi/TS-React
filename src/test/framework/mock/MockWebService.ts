import {RequestBuilder, RoutingConfig, WebService} from "../../../framework/interface/WebService";
import {isPresent} from "../../../framework/utils/CommonFunctions";
import {MockModel} from "./MockModel";
import {Functions} from "../../../framework/utils/Functions";
import {Bind} from "../../../framework/utils/Annotations";
import {Strings} from "../../../framework/utils/Strings";

export class MockRequestBuilder implements RequestBuilder {
  public params: Array<String>;
  private _resolve: Function;
  private _converter: Function;
  private _promise: Promise<any>;

  constructor(public readonly method: string,
              public readonly url: string,
              private _enqueue: (_: MockRequestBuilder) => void) {
  }

  private _data: any;

  public get data(): any {
    return this._data;
  }

  private _convertedData: any;

  public get convertedData(): any {
    return this._convertedData;
  }

  public withData<T>(data: T, converter: (_: T) => any): RequestBuilder {
    this._data = data;
    this._convertedData = isPresent(converter) ? converter(data) : data;
    return this;
  }

  public call<T>(converter: (any: any) => T = Functions.identity): Promise<T> {
    this._converter = converter;
    this._enqueue(this);

    this._promise =  new Promise<T>(resolve =>
      this._resolve = resolve
    );
    return this._promise;
  }

  public withParams(...params: Array<string>): RequestBuilder {
    this.params = params;
    return this;
  }

  public withRouting(routing: RoutingConfig): RequestBuilder {
    return this;
  }

  public async respondAndWaitForResult(response: any, model: MockModel): Promise<any> {
    let promise = this.respond(response);
    await promise;
    await model.dispatchAll();
    return promise;
  }

  public respondAndConvert(response: any): Promise<any> {
    this._resolve(isPresent(this._converter) ?
      this._converter(response) : response
    );
    return this._promise;
  }

  public respond(response: any): Promise<any> {
    this._resolve(response);
    return this._promise;
  }

  public toString(): string {
    return this.url;
  }
}

export class MockWebService implements WebService {
  private _captured: Array<MockRequestBuilder> = [];

  public get(url: string): RequestBuilder {
    return new MockRequestBuilder("GET", url, this.enqueue);
  }

  public post(url: string): RequestBuilder {
    return new MockRequestBuilder("POST", url, this.enqueue);
  }

  public put(url: string): RequestBuilder {
    return new MockRequestBuilder("PUT", url, this.enqueue);
  }

  @Bind
  public enqueue(request: MockRequestBuilder): void {
    this._captured.push(request);
  }

  public expectSingleRequest(url: string): MockRequestBuilder {
    expect(this._captured.length)
      .toBe(1, "Expecting one request while having " + this._captured.toString());

    return this.getRequest(url);
  }

  public getRequest(url: string): MockRequestBuilder {
    expect(this._captured.length > 0).toBeTruthy(
      `Expecting a request ${url} to be made but has nothing`
    );

    let result = this._captured.shift();
    let expectedUrl = result.url + (isPresent(result.params) ? `(${Strings.joinToString(result.params)})` : "");
    expect(result.url).toBe(expectedUrl);
    return result;
  }
}
