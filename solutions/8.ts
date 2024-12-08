import {
  checkMatrixBounds,
  greatestCommonDivisor,
  makeCharMatrix,
} from "../utils";

/***
 * Day 8: Resonant Collinearity
 */

export const solutionA = (input: string) => {
  const grid = makeCharMatrix(input);

  const antennas = findAntennas(grid);
  let antinodes = new Set<string>();

  antennas.forEach((frequency) => {
    // Find antinodes
    frequency.forEach((antenna) => {
      frequency.forEach((antenna2) => {
        if (antenna === antenna2) {
          return;
        }
        let diff = [antenna[0] - antenna2[0], antenna[1] - antenna2[1]];
        let try1 = [antenna[0] + diff[0], antenna[1] + diff[1]];
        let try2 = [antenna2[0] - diff[0], antenna2[1] - diff[1]];
        if (checkMatrixBounds(grid, try1[0], try1[1])) {
          antinodes.add(try1.toString());
        }
        if (checkMatrixBounds(grid, try2[0], try2[1])) {
          antinodes.add(try2.toString());
        }
      });
    });
  });

  console.log(antinodes.size);
};

export const solutionB = (input: string) => {
  const grid = makeCharMatrix(input);

  const antennas = findAntennas(grid);
  let antinodes = new Set<string>();

  antennas.forEach((frequency) => {
    // Find antinodes
    frequency.forEach((antenna) => {
      frequency.forEach((antenna2) => {
        if (antenna === antenna2) {
          return;
        }

        let diff = [antenna[0] - antenna2[0], antenna[1] - antenna2[1]];

        // reduce diff to smallest form
        let gcd = greatestCommonDivisor(diff[0], diff[1]);
        diff = [diff[0] / gcd, diff[1] / gcd];

        // find all matches of diff until out of bounds
        for (let k = 0; ; k++) {
          let try1 = [antenna[0] + diff[0] * k, antenna[1] + diff[1] * k];
          if (!checkMatrixBounds(grid, try1[0], try1[1])) {
            break;
          }
          antinodes.add(try1.toString());
        }
        // other direction
        for (let k = 0; ; k++) {
          let try2 = [antenna[0] - diff[0] * k, antenna[1] - diff[1] * k];
          if (!checkMatrixBounds(grid, try2[0], try2[1])) {
            break;
          }
          antinodes.add(try2.toString());
        }
      });
    });
  });
  console.log(antinodes.size);
};

const findAntennas = (grid: string[][]) => {
  const nodes = new Map<string, number[][]>();

  grid.forEach((row, y) => {
    row.forEach((node, x) => {
      if (node !== ".") {
        if (!nodes.has(node)) {
          nodes.set(node, [[x, y]]);
        } else {
          nodes.get(node)?.push([x, y]);
        }
      }
    });
  });

  return nodes;
};
