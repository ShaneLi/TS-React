import {isPresent} from "./common";

export class Functions {
  public static identity<T>(input: T): T {
    return input;
  }

  public static toString(input: any): string {
    return isPresent(input) ? input.toString() : "";
  }
}
