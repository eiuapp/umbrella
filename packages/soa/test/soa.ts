import { Type } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import * as assert from "assert";
import { soa } from "../src";

describe("soa", () => {
    it("basic", () => {
        const struct = soa(2, {
            a: { type: Type.U16 },
            b: { size: 2, default: [1, 2] },
            c: { type: Type.I8, size: 2, default: [-3, 4] }
        });
        assert.equal(struct.length, 2);
        assert.deepEqual(struct.keys(), ["a", "b", "c"]);
        assert(struct.buffers.a instanceof Uint16Array);
        assert.equal(struct.buffers.a.length, 2);
        assert(struct.buffers.b instanceof Float32Array);
        assert.equal(struct.buffers.b.length, 4);
        assert(struct.buffers.c instanceof Int8Array);
        assert.equal(struct.buffers.c.length, 4);
        assert(
            equiv(
                [...struct.values()],
                [
                    { a: [0], b: [1, 2], c: [-3, 4] },
                    { a: [0], b: [1, 2], c: [-3, 4] }
                ]
            )
        );
    });

    it("copy", () => {
        const src = soa(2, {
            a: { type: Type.U16 },
            b: { size: 2, default: [1, 2] },
            c: { type: Type.I8, size: 2, default: [-3, 4] }
        });
        const dest = soa(4, {
            a: { type: Type.U16, default: [0xaa55] },
            b: { size: 2 },
            c: { type: Type.I8, size: 2 }
        });
        src.copyTo(dest, undefined, 2);
        assert(
            equiv(
                [...dest.values()],
                [
                    { a: [0xaa55], b: [0, 0], c: [0, 0] },
                    { a: [0xaa55], b: [0, 0], c: [0, 0] },
                    { a: [0], b: [1, 2], c: [-3, 4] },
                    { a: [0], b: [1, 2], c: [-3, 4] }
                ]
            )
        );
    });
});
