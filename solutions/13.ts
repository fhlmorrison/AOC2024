import { countWith, makeLines } from "../utils";

/***
 * Day 13: Claw Contraption
 */

export const solutionA = (input: string) => {
  const machines = input.split("\n\n");

  const result = countWith(machines, (machine) => {
    const { ax, ay, bx, by, px, py } = parseMachine(machine);
    return getMinTokens(ax, ay, bx, by, px, py);
  });

  console.log(result);
};

export const solutionB = (input: string) => {
  const machines = input.split("\n\n");

  const result = countWith(machines, (machine) => {
    const { ax, ay, bx, by, px, py } = parseMachine(machine);
    return getMinTokens(
      ax,
      ay,
      bx,
      by,
      px + 10000000000000,
      py + 10000000000000
    );
  });

  console.log(result);
};

// Extract system constants from machine string
const parseMachine = (machine: string) => {
  const [buttonAstr, buttonBstr, prizestr] = makeLines(machine);
  const [ax, ay] = buttonAstr.match(/\d+/g)!.map(Number);
  const [bx, by] = buttonBstr.match(/\d+/g)!.map(Number);
  const [px, py] = prizestr.match(/\d+/g)!.map(Number);
  return { ax, ay, bx, by, px, py };
};

// Check if a number is an integer with some tolerance
const isInteger = (num: number) =>
  num > 0 && (num % 1 < 0.001 || num % 1 > 0.999);

const getMinTokens = (
  ax: number,
  ay: number,
  bx: number,
  by: number,
  px: number,
  py: number
) => {
  // Use Cramer's rule to solve the system of equations
  let det = ax * by - ay * bx;
  let detA = px * by - py * bx;
  let detB = py * ax - px * ay;
  let aPresses = detA / det;
  let bPresses = detB / det;

  if (isInteger(aPresses) && isInteger(bPresses)) {
    return 3 * aPresses + bPresses;
  }

  return 0;
};
