import {
    assert,
    Fn,
    Fn2,
    TypedArray,
    UIntArray
} from "@thi.ng/api";
import { clamp } from "@thi.ng/math";
import { BlitOpts, PackedFormat } from "./api";

export const ensureSize = (
    pixels: TypedArray,
    width: number,
    height: number,
    stride = 1
) => assert(pixels.length >= width * height * stride, "pixel buffer too small");

export const ensureChannel = (fmt: PackedFormat, id: number) => {
    const chan = fmt.channels[id];
    assert(chan != null, `invalid channel ID: ${id}`);
    return chan;
};

export const luminanceABGR = (c: number) =>
    (((c >>> 16) & 0xff) * 29 + ((c >>> 8) & 0xff) * 150 + (c & 0xff) * 76) /
    255;

export const clampRegion = (
    sx: number,
    sy: number,
    w: number,
    h: number,
    maxw: number,
    maxh: number,
    dx = 0,
    dy = 0
) => {
    sx < 0 && ((w += sx), (dx -= sx), (sx = 0));
    sy < 0 && ((h += sy), (dy -= sy), (sy = 0));
    return [sx, sy, clamp(w, 0, maxw - sx), clamp(h, 0, maxh - sy), dx, dy];
};

export const prepRegions = (
    src: { width: number; height: number },
    dest: { width: number; height: number },
    opts: Partial<BlitOpts> = {}
) => {
    let sw = src.width;
    let dw = dest.width;
    let sx: number, sy: number;
    let dx: number, dy: number;
    let rw: number, rh: number;
    [sx, sy, rw, rh] = clampRegion(
        opts.sx || 0,
        opts.sy || 0,
        opts.w || sw,
        opts.h || src.height,
        sw,
        src.height
    );
    [dx, dy, rw, rh, sx, sy] = clampRegion(
        opts.dx || 0,
        opts.dy || 0,
        rw,
        rh,
        dw,
        dest.height,
        sx,
        sy
    );
    return { sx, sy, dx, dy, rw, rh };
};

export const setChannelUni = (
    dbuf: UIntArray,
    src: number,
    set: Fn2<number, number, number>
) => {
    for (let i = dbuf.length; --i >= 0; ) {
        dbuf[i] = set(dbuf[i], src);
    }
};

export const setChannelSame = (
    dbuf: UIntArray,
    sbuf: UIntArray,
    get: Fn<number, number>,
    set: Fn2<number, number, number>
) => {
    for (let i = dbuf.length; --i >= 0; ) {
        dbuf[i] = set(dbuf[i], get(sbuf[i]));
    }
};

export const setChannelConvert = (
    dbuf: UIntArray,
    sbuf: UIntArray,
    from: Fn<number, number>,
    sto: Fn<number, number>,
    mask: number
) => {
    const invMask = ~mask;
    for (let i = dbuf.length; --i >= 0; ) {
        dbuf[i] = (dbuf[i] & invMask) | (from(sto(sbuf[i])) & mask);
    }
};

export const transformABGR = (
    pix: UIntArray,
    format: PackedFormat,
    fn: Fn<number, number>
) => {
    const from = format.fromABGR;
    const to = format.toABGR;
    for (let i = pix.length; --i >= 0; ) {
        pix[i] = from(fn(to(pix[i])));
    }
};
