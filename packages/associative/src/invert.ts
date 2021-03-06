import { IObjectOf } from "@thi.ng/api";

/**
 * Returns a new map in which the original values are used as keys and
 * original keys as values. If `dest` is given, writes results in that
 * map instead. Depending on the value type of `src` and/or if the
 * inverted map should use custom key equality semantics as provided by
 * the Map types in this package, you MUST provide a `dest` map, since
 * the default `dest` will only be a standard ES6 Map.
 *
 * ```
 * invertMap(new Map(), new Map([["a", 1], ["b", 2]]));
 * // Map { 1 => 'a', 2 => 'b' }
 * ```
 *
 * @param src
 * @param dest
 */
export const invertMap = <K, V>(src: Map<K, V>, dest?: Map<V, K>) => {
    dest = dest || new Map();
    for (let p of src) {
        dest.set(p[1], p[0]);
    }
    return dest;
};

/**
 * Returns a new object in which the original values are used as keys
 * and original keys as values. If `dest` is given, writes results in
 * that object instead.
 *
 * ```
 * invertObj({a: 1, b: 2})
 * // { '1': 'a', '2': 'b' }
 * ```
 *
 * @param src
 * @param dest
 */
export const invertObj = (
    src: IObjectOf<PropertyKey>,
    dest: IObjectOf<PropertyKey> = {}
) => {
    for (let k in src) {
        dest[<any>src[k]] = k;
    }
    return dest;
};
