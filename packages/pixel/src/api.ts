import {
    Fn,
    Fn2,
    Type,
    TypedArray
} from "@thi.ng/api";

/**
 * ABGR 8bit lane/channel IDs
 */
export const enum Lane {
    ALPHA = 0,
    RED = 3,
    GREEN = 2,
    BLUE = 1
}

/**
 * Wrap behaviors (currently unused)
 */
export const enum Wrap {
    NONE,
    U,
    V,
    UV
}

/**
 * Filtered access types (currently unused)
 */
export const enum Filter {
    NEAREST,
    LINEAR
}

export type UintType = Type.U8 | Type.U16 | Type.U32;

/**
 * Blend function (for packed integers) given to IBlend implementations.
 */
export type BlendFnInt = Fn2<number, number, number>;

export type BlendFnFloat = (
    out: number[] | TypedArray | null,
    src: ArrayLike<number>,
    dest: ArrayLike<number>
) => ArrayLike<number>;

/**
 * Color channel getter. Returns 0-based channel value (regardless of
 * shift/bit position)
 */
export type ChannelGetter<T> = Fn<T, number>;
/**
 * Color channel setter. Takes current full pixel value and 0-based
 * channel value to set (regardless of shift/bit position). Returns
 * updated pixel value.
 */
export type ChannelSetter<T> = Fn2<T, number, T>;

export interface IABGRConvert<T> {
    /**
     * Converts given ABGR value into internal pixel format.
     */
    fromABGR: Fn<number, T>;
    /**
     * Converts given internal pixel format value to packed ABGR.
     */
    toABGR: Fn<T, number>;
}

export interface PackedChannelSpec {
    /**
     * Channel size in bits (1-8)
     */
    size: number;
    /**
     * Related ABGR lane this channel is mapped from/to. Only used if
     * parent format uses auto-generated `IABGRConvert` implementation
     * (i.e. only if no-user defined converters are given to
     * `PackedFormatSpec`).
     */
    lane?: Lane;
}

export interface PackedChannel {
    /**
     * Channel size in bits (1-8)
     */
    size: number;
    /**
     * Bit shift offset (in bits, not shifted value)
     */
    shift: number;
    /**
     * Shift from ABGR channel offset
     */
    abgrShift: number;
    /**
     * 0-based channel bit mask (WRT parent format)
     */
    mask0: number;
    /**
     * Aligned bit mask (WRT parent format)
     */
    maskA: number;
    /**
     * Original channel/lane ID in ABGR
     */
    lane: Lane;
    /**
     * Int value accessor
     */
    int: ChannelGetter<number>;
    /**
     * Int value accessor
     */
    setInt: ChannelSetter<number>;
    /**
     * Normalized float accessor
     */
    float: ChannelGetter<number>;
    /**
     * Normalized float accessor
     */
    setFloat: ChannelSetter<number>;
}

/**
 * Format configuration passed to `defPackedFormat()`.
 */
export interface PackedFormatSpec extends Partial<IABGRConvert<number>> {
    /**
     * Storage / typed array type
     */
    type: UintType;
    /**
     * Number of actual used bits (must be <= `size`)
     */
    size: number;
    /**
     * Number of alpha channel bits (default: 0). MUST be given if
     * format uses alpha channel.
     */
    alpha?: number;
    /**
     * Individual channel configurations
     */
    channels: PackedChannelSpec[];
}

/**
 * Compiled format object returned by `defPackedFormat()`.
 */
export interface PackedFormat extends IABGRConvert<number> {
    type: UintType;
    size: number;
    alpha: number;
    channels: PackedChannel[];
    // internal marker only
    readonly __compiled: true;
}

export interface CanvasContext {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

export interface RawPixelBuffer extends CanvasContext {
    img: ImageData;
    pixels: Uint32Array;
}

export interface IPixelBuffer<T extends TypedArray, P> {
    width: number;
    height: number;
    pixels: T;

    /**
     * Returns pixel value at given position. If pos is outside the
     * defined region, returns a suitable zero value.
     *
     * @param x
     * @param y
     */
    getAt(x: number, y: number): P;

    /**
     * Writes pixel value at given position. Has no effect if outside of
     * the defined region.
     *
     * @param x
     * @param y
     * @param col
     */
    setAt(x: number, y: number, col: P): this;

    /**
     * Extracts region as new pixel buffer in same format.
     *
     * @param x
     * @param y
     * @param width
     * @param height
     */
    getRegion(
        x: number,
        y: number,
        width: number,
        height: number
    ): IPixelBuffer<T, P>;
}

export interface IBlit<T extends TypedArray, P> {
    /**
     * Blits pixels into given `dest` pixel buffer, using provided
     * options. If `dest` buffer is smaller than source buffer, only the
     * top-left region will be written.
     *
     * Destination MUST be of same format as original. No conversion is
     * performed.
     *
     * @param dest
     * @param opts
     */
    blit(dest: IPixelBuffer<T, P>, opts?: Partial<BlitOpts>): void;

    /**
     * Converts and blits pixels into given canvas at position `x`, `y`
     * (0,0 by default). If canvas is smaller than source buffer, only
     * the top-left region will be written.
     */
    blitCanvas(canvas: HTMLCanvasElement, x?: number, y?: number): void;
}

export interface IBlend<F, T extends TypedArray, P> {
    /**
     * Uses given `op` function to blend / compose pixels of this buffer
     * with those of `dest` and writes results into `dest`. Supports
     * same options as `blit()`.
     *
     * @param op
     * @param dest
     * @param opts
     */
    blend(op: F, dest: IPixelBuffer<T, P>, opts?: Partial<BlitOpts>): void;
}

export interface IInvert {
    invert(): this;
}

export interface IColorChannel<T extends TypedArray, C> {
    /**
     * Returns new pixel buffer of selected color channel. The extracted
     * values are a copy of the original.
     */
    getChannel(id: C): IPixelBuffer<T, number>;
    /**
     * Replaces selected color channel with values from given pixel
     * buffer, which MUST be of same size as target.
     *
     * @param id
     * @param buf
     */
    setChannel(id: C, buf: IPixelBuffer<T, number> | number): this;
}

export interface BlitOpts {
    /**
     * Destination X position (top-left), default: 0
     */
    dx: number;
    /**
     * Destination Y position (top-left), default: 0
     */
    dy: number;
    /**
     * Source X position (top-left), default: 0
     */
    sx: number;
    /**
     * Source Y position (top-left), default: 0
     */
    sy: number;
    /**
     * Source region width (default: buffer width)
     */
    w: number;
    /**
     * Source region width (default: buffer height)
     */
    h: number;
}
