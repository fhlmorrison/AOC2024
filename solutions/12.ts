import {
  countIf,
  countWith,
  findNeighbours,
  makeCharMatrix,
  QUAD_DIRECTIONS,
  zip,
} from "../utils";

/***
 * Day 12: Garden Groups
 */

export const solutionA = (input: string) => {
  let chars = makeCharMatrix(input);

  let regions = seggregateRegions(chars).map((r) => ({
    area: r.size,
    perimeter: countRegionPerimeter(r),
  }));

  let result = countWith(regions, (r) => r.area * r.perimeter);

  console.log(result);
};

export const solutionB = (input: string) => {
  let chars = makeCharMatrix(input);

  let regions = seggregateRegions(chars).map((r) => ({
    area: r.size,
    sides: countRegionCorners(r),
  }));

  let result = countWith(regions, (r) => r.area * r.sides);

  console.log(result);
};

// Split regions of the same character into sets of coordinate strings
const seggregateRegions = (chars: string[][]) => {
  let regions: Set<string>[] = [];
  let visited = new Set<string>();

  chars.forEach((row, y) => {
    row.forEach((char, x) => {
      if (visited.has(`${x},${y}`)) {
        return;
      }
      let region = new Set<string>();
      let cells = [[x, y]];
      while (cells.length > 0) {
        let cell = cells.pop();
        if (cell === undefined) {
          return;
        }
        let [cx, cy] = cell;

        visited.add(`${cx},${cy}`);
        region.add(`${cx},${cy}`);

        let neighbours = findNeighbours(chars, cx, cy, QUAD_DIRECTIONS);

        neighbours.map((neighbour) => {
          let [nx, ny] = neighbour;

          if (chars[ny][nx] != char) {
            return;
          }

          if (!visited.has(`${nx},${ny}`)) {
            visited.add(`${nx},${ny}`);
            cells.push([nx, ny]);
          }
        });
      }
      regions.push(region);
    });
  });
  return regions;
};

const countRegionPerimeter = (region: Set<string>) => {
  let cells = Array.from(region).map((c) => c.split(",").map(Number));

  // Count neighbours not in region
  return countWith(cells, (cell) => {
    let [x, y] = cell;
    return countIf(
      QUAD_DIRECTIONS,
      ([dx, dy]) => !region.has(`${x + dx},${y + dy}`)
    );
  });
};

const countRegionCorners = <T>(region: Set<string>) => {
  let cells = Array.from(region).map((c) => c.split(",").map(Number));

  // Count corners
  return countWith(cells, (cell) => {
    let [x, y] = cell;

    let adjacentDirectionPairs = zip(
      QUAD_DIRECTIONS,
      QUAD_DIRECTIONS.slice(1).concat([QUAD_DIRECTIONS[0]])
    );
    // console.log(adjacentDirectionPairs);
    return countIf(adjacentDirectionPairs, ([d, dd]) => {
      // First adjacent direction
      let [dx, dy] = d;
      let [nx, ny] = [x + dx, y + dy];
      // Second adjacent direction
      let [ddx, ddy] = dd;
      let [nnx, nny] = [x + ddx, y + ddy];
      // Corner direction
      let [cx, cy] = [x + dx + ddx, y + dy + ddy];

      let hasBothAdjacent =
        region.has(`${nnx},${nny}`) && region.has(`${nx},${ny}`);
      let hasNeitherAdjacent =
        !region.has(`${nnx},${nny}`) && !region.has(`${nx},${ny}`);

      // Has no adjacent edges = corner
      // Has adjacent edges but not diagonal = corner
      let isCorner =
        hasNeitherAdjacent || (hasBothAdjacent && !region.has(`${cx},${cy}`));
      return isCorner;
    });
  });
};
