import {isFunction} from "./common";

export function Bind<T extends Function>(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
  if(!isFunction(descriptor.value)) {
    throw new TypeError(`<${propertyKey}> is not a method`);
  }

  return {
    configurable: true,

    get(this: T): T {
      const bound: T = descriptor.value!.bind(this);
      Object.defineProperty(this, propertyKey, {value: bound, configurable: true, writable: true});
      return bound;
    }
  };
}
