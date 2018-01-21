export interface RoutingConfig {
  getUrl(method: string, params: Array<string>): string;
}

export interface RequestBuilder {
  withData<T>(data: T, converter: (_: T) => any): RequestBuilder;
  withParams(...params: Array<string>): RequestBuilder;
  withRouting(routing: RoutingConfig): RequestBuilder;
  call<T>(converter?: (any: any) => T): Promise<T>;
}

export interface WebService {
  get(url: string): RequestBuilder;
  post(url: string): RequestBuilder;
  put(url: string): RequestBuilder;
}
