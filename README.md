# aoc-2024
Advent of Code 2024 solved with typescript using the bun runtime.

### Installation
To install dependencies:

```bash
bun install
```

### Running
To run:

```bash
bun run day "<day_number_>"
```

Test data goes in `testdata/<day_number>.txt`.
Real data goes in `testdata/<day_number>.txt`.

### Fetching Input Data
To fetch input from website, put your session cookie in .env:
```bash
AOC_SESSION="<session_key>"
```
Make sure to not include "session=" in the key

You can then use this to load input data:
```bash
bun run load "<day_number>"
```
### Generateing Solution Files
To generate a new solution file, run
```bash
bun run new "<day_number>"
```
To change the template, edit `solutions/0.ts`
