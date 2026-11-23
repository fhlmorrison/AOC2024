/***
 * Day 0: Template
 */

import { makeCharMatrix } from "../utils";

export const solutionA = (input: string) => {
  const grid = makeCharMatrix(input);
  const startY = grid.findIndex((row) => row.some((e) => e == "S"));
  const startX = grid[startY].findIndex((e) => e == "S");

  const endY = grid.findIndex((row) => row.some((e) => e == "E"));
  const endX = grid[endY].findIndex((e) => e == "E");

  //   const MIN_TIME_SAVED = 100 // Real data
  const MIN_TIME_SAVED = 2 // Test data

  // 2 picoseconds allows to cross a single wall
  // Goal is to find all distinct 2 move cheats that reduce the time by at least 100 picoseconds from the best time

  // A possible cheat will always start on a (reachable) wall tile and end on a track tile
  // While doing the search, 
  // we can keep a cheat move tracker as well 
  // and do an exhaustive search ending when we hit the end or the best time - 100

  console.log([startY, startX], [endY, endX]);

  let [currX, currY] = [startX, startY];

  // find fastest time
  // Dijkstra's

  


  console.log("Not implemented");
};

export const solutionB = (input: string) => {
  console.log("Not implemented");
};
