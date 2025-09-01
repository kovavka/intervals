# Intervals.js

A program to find an array of intervals based on included and excluded provided intervals.

The CLI application takes two sets of intervals (`--include` and `--exclude`),
which may be overlapping and unsorted, but contains only integers.
The app returns sets of included non-overlapping, sorted intervals without any excluded values listed in the `--exclude` parameter.

Example:

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

Usage:
```bash
node dist/index.mjs --include "[[10,30],[20,40]]" --exclude "[[16,24]]"
```

## Setup

### Prerequisites

NVM should be installed for the project to work correctly.

### Install modules

Switch to the correct version of Node:

```shell
nvm use
```

Install dependencies:

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

Interval should be stringified json of an array of Interval. Where Interval is an array of two elements: start and end.
The program accepts only integer numbers.

## Contribute

### Dev mode (debug)

```bash
npm run dev -- <parameters>
```

### Testing

(something about testing)

## Limitations

- Integer check

## Future considerations

- Deploy