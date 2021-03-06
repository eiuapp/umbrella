import { assert, Fn } from "@thi.ng/api";
import { CommonOpts, State } from "./api";
import { Subscription } from "./subscription";
import { optsWithID } from "./utils/idgen";

/**
 * Returns a {@link Subscription} which transforms each incoming value
 * into a new {@link Stream}, subscribes to it (via an hidden / internal
 * subscription) and then only passes values from that stream to its own
 * subscribers.
 *
 * @remarks
 * If a new value is received, the metastream first unsubscribes from
 * any still active stream, before creating and subscribing to the new
 * stream. Hence this stream type is useful for cases where streams need
 * to be dynamically created & inserted into an existing dataflow
 * topology.
 *
 * The user supplied `factory` function will be called for each incoming
 * value and is responsible for creating the new stream instances. If
 * the function returns null/undefined, no further action will be taken
 * (acts like a filter transducer).
 *
 * The factory function does NOT need to create *new* streams, but can
 * merely return other existing streams, and so making the meta stream
 * act like a switch with arbitrary criteria.
 *
 * If the meta stream itself is the only subscriber to existing input
 * streams, you'll need to configure the input's
 * {@link CommonOpts.closeOut} option to keep them alive and support
 * dynamic switching between them.
 *
 * @example
 * ```ts
 * // transform each received odd number into a stream
 * // producing 3 copies of that number in the metastream
 * // even numbers are ignored
 * a = metastream(
 *   (x) => (x & 1)
 *     ? fromIterable(tx.repeat(x, 3), { delay: 100 })
 *     : null
 * );
 *
 * a.subscribe(trace())
 * a.next(23)
 *
 * // 23
 * // 23
 * // 23
 *
 * a.next(42) // ignored by factory fn
 *
 * a.next(43)
 * // 43
 * // 43
 * // 43
 * ```
 *
 * @example
 * ```ts
 * // infinite inputs
 * a = fromIterable(
 *   tx.repeat("a"),
 *   { delay: 1000, closeOut: CloseMode.NEVER }
 * );
 * b = fromIterable(
 *   tx.repeat("b"),
 *   { delay: 1000, closeOut: CloseMode.NEVER }
 * );
 *
 * // stream selector / switch
 * m = metaStream((x) => x ? a : b);
 * m.subscribe(trace("meta from: "));
 *
 * m.next(true);
 * // meta from: a
 *
 * m.next(false);
 * // meta from: b
 *
 * m.next(true);
 * // meta from: a
 * ```
 *
 * @param factory
 * @param id
 */
export const metaStream = <A, B>(
    factory: Fn<A, Subscription<B, B>>,
    opts?: Partial<CommonOpts>
) => new MetaStream(factory, opts);

export class MetaStream<A, B> extends Subscription<A, B> {
    factory: Fn<A, Subscription<B, B>>;
    stream?: Subscription<B, B>;
    sub?: Subscription<B, B>;

    constructor(
        factory: Fn<A, Subscription<B, B>>,
        opts?: Partial<CommonOpts>
    ) {
        super(undefined, optsWithID("metastram", opts));
        this.factory = factory;
    }

    next(x: A) {
        if (this.state < State.DONE) {
            if (this.stream) {
                this.stream.unsubscribe(this.sub);
            }
            let stream = this.factory(x);
            if (stream) {
                this.stream = stream;
                this.sub = this.stream.subscribe({
                    next: (x) => {
                        stream === this.stream && super.dispatch(x);
                    },
                    done: () => {
                        this.stream!.unsubscribe(this.sub);
                        if (stream === this.stream) {
                            this.stream = undefined;
                            this.sub = undefined;
                        }
                    },
                    error: (e) => super.error(e),
                    __owner: this
                });
            }
        }
    }

    done() {
        if (this.stream) {
            this.detach();
        }
        super.done();
    }

    unsubscribe(sub?: Subscription<B, any>) {
        if (this.stream && (!sub || this.subs.length === 1)) {
            this.detach();
        }
        return super.unsubscribe();
    }

    protected detach() {
        assert(!!this.stream, "input stream already removed");
        this.stream!.unsubscribe(this.sub);
        delete this.stream;
        delete this.sub;
    }
}
