import {
  countWith,
  DIRECTIONS_MAP,
  filterCoords,
  makeCharMatrix,
} from "../utils";

/***
 * Day 15: Warehouse Woes
 */

const MOVE_MAP = {
  "^": DIRECTIONS_MAP.N,
  ">": DIRECTIONS_MAP.E,
  v: DIRECTIONS_MAP.S,
  "<": DIRECTIONS_MAP.W,
};

type Move = keyof typeof MOVE_MAP;

export const solutionA = (input: string) => {
  const [gridStr, instructionsStr] = input.split("\n\n");

  const grid = makeCharMatrix(gridStr);
  const instructions = makeCharMatrix(instructionsStr).flat();

  let robotPos = filterCoords(grid, (c) => c === "@")[0];

  for (let move of instructions) {
    robotPos = doMove(grid, robotPos[0], robotPos[1], move as Move) ?? robotPos;
  }

  const result = countWith(grid, (c, y) =>
    countWith(c, (c, x) => (c === "O" ? 100 * y + x : 0))
  );

  console.log(result);
};

export const solutionB = (input: string) => {
  const [gridStr, instructionsStr] = input.split("\n\n");

  const grid = makeCharMatrix(gridStr);
  const wideGrid = widenMap(grid);
  const instructions = makeCharMatrix(instructionsStr).flat();

  let robotPos = filterCoords(wideGrid, (c) => c === "@")[0];

  for (let move of instructions) {
    robotPos =
      doMoveWide(wideGrid, robotPos[0], robotPos[1], move as Move) ?? robotPos;
  }

  let result = countWith(wideGrid, (c, y) =>
    countWith(c, (c, x) => (c === "[" ? 100 * y + x : 0))
  );

  console.log(result);
};

// Mutates grid and returns new position if move was successful. null otherwise
const doMove = (grid: string[][], x: number, y: number, move: Move) => {
  const [dx, dy] = MOVE_MAP[move];
  const nx = x + dx;
  const ny = y + dy;

  const movingTo = grid[ny]?.[nx];

  // Blocked by wall
  if (movingTo === undefined || movingTo === "#") return null;

  // If moving to empty space or box that can be moved
  if (movingTo === "." || (movingTo === "O" && doMove(grid, nx, ny, move))) {
    grid[ny][nx] = grid[y][x];
    grid[y][x] = ".";
    return [nx, ny];
  }

  return null;
};

// Widen map by duplicating columns according to cell type
const widenMap = (grid: string[][]) => {
  return grid.map((row) =>
    row
      .map((c) => {
        if (c === "O") return ["[", "]"];
        if (c === "@") return ["@", "."];
        return [c, c];
      })
      .flat()
  );
};

// Mutates grid and returns new position if move was successful. null otherwise
const doMoveWide = (grid: string[][], x: number, y: number, move: Move) => {
  const [dx, dy] = MOVE_MAP[move];
  const nx = x + dx;
  const ny = y + dy;

  const movingTo = grid[ny]?.[nx];

  // Blocked by wall
  if (movingTo === undefined || movingTo === "#") return null;

  if (movingTo === ".") {
    grid[ny][nx] = grid[y][x];
    grid[y][x] = ".";
    return [nx, ny];
  }

  // Moving sideways if box can be moved
  if ((move === ">" || move === "<") && doMoveWide(grid, nx, ny, move)) {
    grid[ny][nx] = grid[y][x];
    grid[y][x] = ".";
    return [nx, ny];
  }

  // Wide boxes moving up and down need to check both sides moving is valid before moving
  if (move === "v" || move === "^") {
    // Which additional column to check
    const delta = movingTo === "[" ? 1 : -1;

    if (
      canDoMoveWide(grid, nx, ny, move) &&
      canDoMoveWide(grid, nx + delta, ny, move)
    ) {
      doMoveWide(grid, nx, ny, move);
      doMoveWide(grid, nx + delta, ny, move);
      grid[ny][nx] = grid[y][x];
      grid[ny][nx + delta] = ".";
      grid[y][x] = ".";
      return [nx, ny];
    }
  }

  return null;
};

// Checks if move is possible in wide grid (for wide boxes moving up and down)
const canDoMoveWide = (grid: string[][], x: number, y: number, move: Move) => {
  const [dx, dy] = MOVE_MAP[move];
  const nx = x + dx;
  const ny = y + dy;

  const movingTo = grid[ny]?.[nx];

  // Blocked by wall
  if (movingTo === undefined || movingTo === "#") return false;

  if (movingTo === ".") {
    return true;
  }

  if (
    movingTo === "[" &&
    canDoMoveWide(grid, nx, ny, move) &&
    canDoMoveWide(grid, nx + 1, ny, move)
  ) {
    return true;
  }

  if (
    movingTo === "]" &&
    canDoMoveWide(grid, nx, ny, move) &&
    canDoMoveWide(grid, nx - 1, ny, move)
  ) {
    return true;
  }

  return false;
};
