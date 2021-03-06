<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/grid-iterators

[![npm version](https://img.shields.io/npm/v/@thi.ng/grid-iterators.svg)](https://www.npmjs.com/package/@thi.ng/grid-iterators)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/grid-iterators.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Diagonal](#diagonal)
  - [Hilbert curve](#hilbert-curve)
  - [Interleave columns](#interleave-columns)
  - [Interleave rows](#interleave-rows)
  - [Random](#random)
  - [Outward spiral](#outward-spiral)
  - [Z-curve](#z-curve)
  - [Zigzag columns](#zigzag-columns)
  - [Zigzag diagonal](#zigzag-diagonal)
  - [Zigzag rows](#zigzag-rows)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D grid iterators w/ multiple orderings.

Provides the 10 following orderings to generate grid coordinates:

### Diagonal

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/diagonal2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/diagonal.ts)

### Hilbert curve

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/hilbert2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/hilbert.ts)

### Interleave columns

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/interleavecolumns2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/interleave.ts)

Supports custom strides... example uses `step = 4`

### Interleave rows

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/interleaverows2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/interleave.ts)

Supports custom strides... example uses `step = 4`

### Random

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/random2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/random.ts)

Supports custom PRNG implementations via `IRandom` interface defined in
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/master/packages/random)

### Outward spiral

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/spiral2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/spiral.ts)

### Z-curve

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/zcurve2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/zcurve.ts)

### Zigzag columns

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/zigzagcolumns2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/zigzag-columns.ts)

### Zigzag diagonal

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/zigzagdiag2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/zigzag-diagonal.ts)

### Zigzag rows

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/grid-iterators/zigzagrows2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/master/packages/grid-iterators/src/zigzag-rows.ts)

Some functions have been ported from [Christopher
Kulla](https://fpsunflower.github.io/ckulla/)'s Java-based [Sunflow
renderer](https://sunflow.sf.net).

For more basic 2D/3D grid iteration, also see `range2d()` & `range3d()`
in
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers).

### Status

**STABLE** - used in production

### Related packages

- [@thi.ng/morton](https://github.com/thi-ng/umbrella/tree/master/packages/morton) - Z-order-curve / Morton encoding & decoding for 1D, 2D, 3D
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers) - Lightweight transducer implementations for ES6 / TypeScript

## Installation

```bash
yarn add @thi.ng/grid-iterators
```

## Dependencies

- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/master/packages/arrays)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/master/packages/binary)
- [@thi.ng/morton](https://github.com/thi-ng/umbrella/tree/master/packages/morton)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/master/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### grid-iterators <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/grid-iterators.png)

[Live demo](https://demo.thi.ng/umbrella/grid-iterators/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/grid-iterators)

## API

[Generated API docs](https://docs.thi.ng/umbrella/grid-iterators/)

```ts
import * as gi from "@thi.ng/grid-iterators";

[...gi.zigzagRows2d(4, 4)]

// [
//   [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
//   [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ],
//   [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ],
//   [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ]
// ]
```

## Authors

Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
