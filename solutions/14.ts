/***
 * Day 14: Restroom Redoubt
 */

import { makeLines } from "../utils";

const TEST_GRIDSIZE: Coordinate = {
  x: 11,
  y: 7,
};

const GRIDSIZE: Coordinate = {
  x: 101,
  y: 103,
};

type Coordinate = { x: number; y: number };

type Robot = {
  position: Coordinate;
  velocity: Coordinate;
};

export const solutionA = (input: string) => {
  const robots = parseRobots(input);

  // For test input
  //   const advancedRobots = advanceRobots(robots, TEST_GRIDSIZE, 100);
  //   const results = categorizeRobots(advancedRobots, TEST_GRIDSIZE);

  // For real input
  const advancedRobots = advanceRobots(robots, GRIDSIZE, 100);
  const results = categorizeRobots(advancedRobots, GRIDSIZE);

  console.log(results);
};

export const solutionB = (input: string) => {
  let robots = parseRobots(input);

  let iterations = 0;
  while (!isTree(robots, GRIDSIZE)) {
    // Period is x * y, robots will return to the starting position
    if (iterations >= GRIDSIZE.x * GRIDSIZE.y) {
      console.log("Reached max iterations (grid period)");
      break;
    }
    robots = robots.map((robot) => advanceRobot(robot, GRIDSIZE, 1));
    iterations++;
  }

  // Look at the pretty christmas tree
  console.log(toString(robots, GRIDSIZE));
  console.log(iterations);
};

const parseRobots = (input: string): Robot[] => {
  return makeLines(input).map((line) => {
    const [position, velocity] =
      line
        .match(/-?[-\d]+,[-\d]+/g)
        ?.map((x) => x.split(",").map(Number))
        .map(([x, y]) => ({ x, y })) ?? [];
    return { position, velocity };
  });
};

const toString = (robots: Robot[], gridSize: Coordinate) => {
  const grid = Array.from({ length: gridSize.y }, () =>
    Array.from({ length: gridSize.x }, () => 0)
  );

  robots.forEach((robot) => {
    grid[robot.position.y][robot.position.x]++;
  });

  //   return grid;
  return grid.map((row) => row.map((c) => `${c || "."}`).join("")).join("\n");
};

const categorizeRobots = (robots: Robot[], gridSize: Coordinate) => {
  const center = {
    x: Math.floor(gridSize.x / 2),
    y: Math.floor(gridSize.y / 2),
  };

  console.log(center);

  const quads = robots.reduce(
    (acc, robot) => {
      if (robot.position.x < center.x && robot.position.y < center.y) {
        acc[0]++;
      }
      if (robot.position.x > center.x && robot.position.y < center.y) {
        acc[1]++;
      }
      if (robot.position.x < center.x && robot.position.y > center.y) {
        acc[2]++;
      }
      if (robot.position.x > center.x && robot.position.y > center.y) {
        acc[3]++;
      }
      return acc;
    },
    [0, 0, 0, 0]
  );
  console.log(quads);
  return quads.reduce((acc, quad) => quad * acc);
};

const advanceRobots = (
  robots: Robot[],
  gridSize: Coordinate,
  iterations: number
) => {
  return robots.map((robot) => advanceRobot(robot, gridSize, iterations));
};

const advanceRobot = (
  robot: Robot,
  gridSize: Coordinate,
  iterations: number
) => {
  return {
    position: {
      x: strictMod(
        robot.position.x + robot.velocity.x * iterations,
        gridSize.x
      ),
      y: strictMod(
        robot.position.y + robot.velocity.y * iterations,
        gridSize.y
      ),
    },
    velocity: robot.velocity,
  };
};

// Assuming a tree has a line of single robots
const isTree = (robots: Robot[], gridSize: Coordinate) => {
  return toString(robots, gridSize).includes("11111111");
};

const strictMod = (a: number, b: number) => ((a % b) + b) % b;
