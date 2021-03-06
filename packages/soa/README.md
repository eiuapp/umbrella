<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/soa

[![npm version](https://img.shields.io/npm/v/@thi.ng/soa.svg)](https://www.npmjs.com/package/@thi.ng/soa)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/soa.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

SOA & AOS memory mapped structured views with optional & extensible serialization.

### Status

**ALPHA** - bleeding edge / work-in-progress

See tests for usage. This package might be merged with and/or superseded
by
[@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/master/packages/ecs).

### Related packages

- [@thi.ng/ecs](https://github.com/thi-ng/umbrella/tree/master/packages/ecs) - Entity Component System based around typed arrays & sparse sets
- [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/master/packages/malloc) - ArrayBuffer based malloc() impl for hybrid JS/WASM use cases, based on thi.ng/tinyalloc
- [@thi.ng/unionstruct](https://github.com/thi-ng/umbrella/tree/master/packages/unionstruct) - C-style struct, union and bitfield read/write views of ArrayBuffers
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/master/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors

## Installation

```bash
yarn add @thi.ng/soa
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/master/packages/binary)
- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### soa-ecs <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/soa-ecs-100k.png)

[Live demo](https://demo.thi.ng/umbrella/soa-ecs/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/soa-ecs)

### webgl-cube <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/webgl-cube/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-cube)

## API

[Generated API docs](https://docs.thi.ng/umbrella/soa/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
