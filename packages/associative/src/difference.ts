import { Reducer } from "@thi.ng/transducers";
import { xformSetOp } from "./internal/xform-setop";
import { into } from "./into";
import { copy, empty } from "./utils";

/**
 * Computes the difference of sets `a - b` and writes results to new set
 * or optionally given set `out` (assumed to be empty for correct
 * results).
 *
 * @param a
 * @param b
 * @param out
 */
export const difference = <T>(a: Set<T>, b: Set<T>, out?: Set<T>): Set<T> => {
    if (a === b) {
        return out || empty(a, Set);
    }
    out = out ? into(out, a) : copy(a, Set);
    for (let i of b) {
        out!.delete(i);
    }
    return out!;
};

/**
 * Reducer version of `difference`. If `src` is given returns the
 * reduced difference of given inputs, else merely returns a reducer
 * to be used with thi.ng/transducers `reduce` / `transduce` functions.
 *
 * @param src
 */
export function differenceR<T>(): Reducer<Set<T>, Iterable<T>>;
export function differenceR<T>(src: Iterable<T>): Set<T>;
export function differenceR<T>(src?: Iterable<Iterable<T>>) {
    return xformSetOp<T>(differenceR, difference, src);
}
