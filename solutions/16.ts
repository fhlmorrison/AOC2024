/***
 * Day 16: Reindeer Maze
 */

import { filterCoords, makeCharMatrix, QUAD_DIRECTIONS } from "../utils";

type VisitRecord = {
  score: number;
  /**
   * [x, y, dir]
   *  */
  prev: number[][];
};

export const solutionA = (input: string) => {
  const grid = makeCharMatrix(input);

  const [startx, starty] = filterCoords(grid, (c) => c === "S")[0];
  const [endx, endy] = filterCoords(grid, (c) => c === "E")[0];

  const visited = getShortestMap(grid, startx, starty);

  const result = Math.min(
    ...[0, 1, 2, 4].map(
      (i) => visited.get([endx, endy, i].toString())?.score || Infinity
    )
  );

  console.log(result);
};

export const solutionB = (input: string) => {
  const grid = makeCharMatrix(input);

  const [startx, starty] = filterCoords(grid, (c) => c === "S")[0];
  const [endx, endy] = filterCoords(grid, (c) => c === "E")[0];

  const visited = getShortestMap(grid, startx, starty);

  let inPath = getAllMinPathNodes(visited, endx, endy);

  console.log(inPath.size);
};

/**
 * Uses a modified Dijkstra's algorithm to find the minimum score paths from the start node to all other nodes
 * @param grid Grid of the maze
 * @param startx X coordinate of the start node
 * @param starty Y coordinate of the start node
 * @returns Map of visited nodes to their score and previous nodes
 */
const getShortestMap = (grid: string[][], startx: number, starty: number) => {
  const visited = new Map<string, VisitRecord>();

  // Add start node facing East with score 0
  visited.set([startx, starty, 1].toString(), {
    score: 0,
    prev: [],
  });

  // Add start node facing East to the todo list
  const todo = [[startx, starty, 1]];

  while (todo.length > 0) {
    const current = todo.shift();
    if (!current) {
      break;
    }
    const [x, y, dir] = current;
    if (grid[y][x] === "E") {
      continue;
    }

    const currentScore = visited.get(current.toString());
    if (!currentScore) {
      continue;
    }

    QUAD_DIRECTIONS.forEach((d, i) => {
      const [dx, dy] = d;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length) {
        return;
      }

      const next = grid[ny][nx];
      if (next === "#") {
        return;
      }

      // Takes 1 turn
      let score = 1001;

      if (dir === i) {
        // Takes 0 turns
        score = 1;
      } else if (dir % 2 === i % 2) {
        // Takes 2 turns
        score = 2001;
      }

      const nextScore = currentScore.score + score;

      const existingScore = visited.get([nx, ny, i].toString());
      if (existingScore === undefined || nextScore < existingScore.score) {
        visited.set([nx, ny, i].toString(), {
          score: nextScore,
          prev: [[x, y, dir]],
        });
        todo.push([nx, ny, i]);
      }
      // Multiple paths with same score
      if (existingScore && nextScore === existingScore.score) {
        existingScore.prev.push([x, y, dir]);
      }
    });
  }
  return visited;
};

/**
 * Backtracks to find all nodes that are in the paths with the minimum score
 * @param visited Map of visited nodes to their score and previous nodes
 * @param endx X coordinate of the end node
 * @param endy Y coordinate of the end node
 * @returns Set of all nodes that exist in the paths with the minimum score
 */
const getAllMinPathNodes = (
  visited: Map<string, VisitRecord>,
  endx: number,
  endy: number
) => {
  let ends = [
    visited.get([endx, endy, 0].toString()),
    visited.get([endx, endy, 1].toString()),
    visited.get([endx, endy, 2].toString()),
    visited.get([endx, endy, 3].toString()),
  ];

  let minScore = Math.min(...ends.map((e) => e?.score || Infinity));

  // Backtracking to find all nodes in min paths
  let inPath = new Set<string>();

  inPath.add([endx, endy].toString());

  let nodes = ends.filter((n) => n?.score === minScore);

  while (nodes.length > 0) {
    let node = nodes.pop();
    for (let prev of node?.prev || []) {
      let prevNode = visited.get(prev.toString());
      if (prevNode) {
        nodes.push(prevNode);
      }
      inPath.add([prev[0], prev[1]].toString());
    }
  }
  return inPath;
};

const toString = (grid: string[][], inPath: Set<string>) => {
  return grid
    .map((row, y) =>
      row
        .map((c, x) => {
          if (inPath.has([x, y].toString())) {
            return "O";
          }
          return c;
        })
        .join("")
    )
    .join("\n");
};
