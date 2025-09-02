# Intervals

CLI tool to find an array of intervals from given include and exclude sets.

The application takes two sets of intervals (`--include` and `--exclude`),
which may be overlapping and unsorted, but contains only integers.
The app returns sets of included non-overlapping, sorted intervals without any excluded values listed in the `--exclude` parameter.

Algorithm complexity is O(n log n) for sorting and O(n) for the following logic.

**Examples**

Exclude can affect 2 overlapping sets:

```txt
Include:
10                 30
|------------------|
         20                 40
         |------------------|

Exclude:
    16        24
    |---------|

Output:
10  15         25            40
|---|          |-------------|
```

Exclude sets can "remove" everything from given include:

```txt
Include:
10                          40
|---------------------------|

Exclude:
10       20       30        40
|--------|        |---------|
     15                35
     |-----------------|

Output:
(empty)
```

Exclude can be empty and overlapping or touching include sets should be concatenated

```txt
Include:
10                 30       40         50
|------------------|        |----------|
         20                 40
         |------------------|

Exclude:
(none)

Output:
10                                     50
|--------------------------------------|
```

**Usage**

Command:

```bash
node dist/index.mjs --include "[[10,30],[20,40]]" --exclude "[[16,24]]"
```

Output:

```text
[[10,15],[25,40]]
```

## Setup

**[Optional] Switch to the correct version of Node.js if using NVM**

The project doesn't use any specific features from the latest Node, but if you already have NVM installed,
you can switch to the project's version of Node.js listed in `.nvmrc`. Otherwise v16+ should be enough.

```shell
nvm use
```

**[Required] Install modules**

```shell
npm install
```

## Usage

### Quick start

1. Build the app:

```bash
npm run build
```

2. Use CLI:

```bash
node dist/index.mjs <parameters>
```

### Parameters


```text
-i, --include [intervals]  intervals to include, JSON array
-e, --exclude [intervals]  intervals to exclude, JSON array
-h, --help                 display help for command
```

Intervals must be provided as a stringified JSON array.
Each interval is an array of two integers\*: `start` and `end`.

> \* see [Limitations](#limitations)

Parameters `include` and `exclude` are optional and will be considered as "no intervals" if not provided.
Alternatively you can provide `"[]"` or `""` to achieve the same result.

Examples:

```text
--include "[[10,100]]" // includes one interval from 10 to 100
--exclude "[[410,420], [95,205], [100,150]]" // excludes 3 intervals
-i "[]" // includes zero intervals
-e "" // excludes zero intervals
```

## Contributing

Any contribution to the project is welcome, though we kindly ask you to follow the developer guide:

- Submit pull requests against the develop branch.
- Follow the existing code style (in IDE you can run eslint and prettier on save).
- Update and/or add new unit tests if needed.

Upon opening the pull request provide a description explaining what problem is it solving.
For bugs provide steps to reproduce.

### Dev mode (debug)

```bash
npm run dev -- <parameters>
```

### Testing

Unit test should cover every edge case and use-case.

When adding new functionality, make sure the corresponding test file has the same name (e.g. `feature.ts` -> `feature.test.ts`).
All tests are located in the `tests` folder.

## Limitations

Input numbers must be in the range from `-9 007 199 254 740 991` to `+9 007 199 254 740 991`
(`Number.MIN_SAFE_INTEGER` – `Number.MAX_SAFE_INTEGER`) due to limitations of JS `number` type and standard `JSON.parse` implementation.
Any number outside of this range is considered invalid.

## Future plans

In the future version we are planning to support:

- Deploy a package to NPM with an option to install it globally and run as a command (e.g. `npx intervals --include "[[1,5]]"`)
- Access a program as a library (to use `findIntervals` function directly from JS code)
- Support input as a simplified string (e.g. `--include "1..5,-10..-1"`)
- Support input from stdin