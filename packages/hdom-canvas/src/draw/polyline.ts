import { IObjectOf } from "@thi.ng/api";
import { ReadonlyVec } from "@thi.ng/vectors";
import { __drawPoly } from "./polygon";

export const polyline = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pts: ReadonlyVec[]
) => {
    if (pts.length < 2 || attribs.stroke == "none") return;
    __drawPoly(ctx, pts);
    ctx.stroke();
};
