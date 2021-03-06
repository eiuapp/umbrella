import { Reducer } from "@thi.ng/transducers";
import { xformSetOp } from "./internal/xform-setop";
import { into } from "./into";
import { copy } from "./utils";

/**
 * Computes union of sets `a` and `b` and writes results to new set or
 * optionally given set `out` (assumed to be empty for correct results).
 *
 * @param a
 * @param b
 * @param out
 */
export const union = <T>(a: Set<T>, b: Set<T>, out?: Set<T>): Set<T> => {
    if (a.size < b.size) {
        const t = a;
        a = b;
        b = t;
    }
    out = out ? into(out, a) : copy(a, Set);
    return a === b ? out! : into(out!, b);
};

/**
 * Reducer version of `union`. If `src` is given returns the
 * reduced union of given inputs, else merely returns a reducer
 * to be used with thi.ng/transducers `reduce` / `transduce` functions.
 *
 * @param src
 */
export function unionR<T>(): Reducer<Set<T>, Iterable<T>>;
export function unionR<T>(src: Iterable<T>): Set<T>;
export function unionR<T>(src?: Iterable<Iterable<T>>) {
    return xformSetOp<T>(unionR, union, src);
}
