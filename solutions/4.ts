import { OCTO_DIRECTIONS, makeCharMatrix } from "../utils";

/***
 * Day 4: Ceres Search
 */

export const solutionA = (input: string) => {
  const chars = makeCharMatrix(input);

  const result = countXMAS(chars);

  console.log(result);
};

export const solutionB = (input: string) => {
  const chars = makeCharMatrix(input);

  const result = countX_MAS(chars);

  console.log(result);
};

function countXMAS(grid: string[][]): number {
  const word = "XMAS";

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function isMatch(x: number, y: number, dx: number, dy: number) {
    for (let i = 0; i < word.length; i++) {
      const nx = x + i * dx;
      const ny = y + i * dy;

      // Check if we are out of bounds
      // or the character doesn't match the word
      if (
        nx < 0 ||
        nx >= rows ||
        ny < 0 ||
        ny >= cols ||
        grid[nx][ny] !== word[i]
      ) {
        return false;
      }
    }
    return true;
  }

  // Try every starting character and direction
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      for (const [dx, dy] of OCTO_DIRECTIONS) {
        if (isMatch(x, y, dx, dy)) {
          count++;
        }
      }
    }
  }

  return count;
}

const isMAS = (first: string, second: string) =>
  (first === "M" && second === "S") || (first === "S" && second === "M");

function countX_MAS(grid: string[][]) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  // Iterate through the grid skipping the border
  // (since we need to check the diagonals around each cell)
  for (let x = 1; x < rows - 1; x++) {
    for (let y = 1; y < cols - 1; y++) {
      if (grid[x][y] === "A") {
        const NW = grid[x - 1][y - 1];
        const NE = grid[x - 1][y + 1];
        const SW = grid[x + 1][y - 1];
        const SE = grid[x + 1][y + 1];

        if (isMAS(NW, SE) && isMAS(NE, SW)) {
          count++;
        }
      }
    }
  }
  return count;
}
