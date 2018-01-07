export function isPresent(value: any): boolean {
  return value != null;
}

export function isBlank(value: any): boolean {
  return value == null;
}

export function isEmptyString(value: string): boolean {
  return isBlank(value) || value.length === 0;
}

export function isEmptyArray(value: Array<any>): boolean {
  return isBlank(value) || value.length === 0;
}

export function isFunction(value: any): boolean {
  return isPresent(value) && typeof value === "function";
}

export function delay(milliseconds: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
}

