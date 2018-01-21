import {isEmptyArray, isEmptyString, isPresent} from "./CommonFunctions";
import {Functions} from "./Functions";

export class Strings {
  public static ensureTrailing(value: string, trailing: string): string {
    if (isEmptyString(value) ) {
      return trailing;
    } else if (value.endsWith(trailing)) {
      return value;
    } else {
      return value + trailing;
    }
  }

  public static joinToString<T>(array: Array<T>,
                                delimiter: string = ", ",
                                converter: (_:T) => string = Functions.toString) {
    if (isEmptyArray(array)) return "";
    if (isPresent(converter)) {
      return array.map(converter).join(delimiter);
    } else {
      return array.join(delimiter);
    }
  }

}
