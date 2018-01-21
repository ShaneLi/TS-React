/*
 * Copyright (c) 2018. Xiangwen Li. All rights reserved.
 */

export class Arrays {
  public static contains<T>(array: Array<T>, predicate: (_: T) => boolean): boolean {
    for (let i=0; i<array.length; i++) {
      if (predicate(array[i])) return true;
    }
    return false;
  }

  public static toMap<A, K ,V>(array: Array<A>,
                               keyMapper: (_: A) => K,
                               valueMapper: (_: A) => V): Map<K, V> {
    let map = new Map<K, V>();
    array.forEach(item =>
      map.set(keyMapper(item), valueMapper(item))
    );
    return map;
  }
}
