/***
 * Day 17: Chronospatial Computer
 */

import { makeLines } from "../utils";

export const solutionA = (input: string) => {
  let { instructions, registers } = parseInput(input);

  let output = performInstructions(instructions, registers);

  console.log(output.toString());
};

export const solutionB = (input: string) => {
  let { instructions, registers } = parseInput(input);

  let targetValues = instructions.flat();

  const three_bit_numbers = [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n];

  let possibleValues = [0n];
  for (let i = 1; i <= targetValues.length; i++) {
    let values = possibleValues
      .map((v) => three_bit_numbers.map((d) => (v << 3n) + d))
      .flat();

    let matches = values.filter((v) => {
      let out = performInstructions(instructions, [Number(v), 0, 0]);

      return (
        out.length === i && out[0] === targetValues[targetValues.length - i]
      );
    });
    possibleValues = matches;
  }

  let best = possibleValues.reduce((acc, v) => {
    return acc > v ? v : acc;
  });

  console.log(best.toString());
};

const parseInput = (input: string) => {
  let [registerStr, instructionsStr] = input.split("\n\n");

  let registers = makeLines(registerStr).map(
    (line) => line.match(/\d+/g)?.map(Number)[0] ?? 0
  );

  let instructions =
    instructionsStr
      .match(/\d+/g)
      ?.map(Number)
      .reduce((acc, v, i) => {
        if (i % 2 === 0) {
          acc.push([v]);
        } else {
          acc[acc.length - 1].push(v);
        }
        return acc;
      }, [] as number[][]) || [];

  return { instructions, registers };
};

const performInstructions = (instructions: number[][], registers: number[]) => {
  let [a, b, c] = registers;
  let output: number[] = [];
  let ip = 0;

  while (ip < instructions.length) {
    let [opCode, operand] = instructions[ip];
    let comboOperand = operand < 4 ? operand : [a, b, c][operand - 4];

    switch (opCode) {
      case 0:
        // adv - division
        a = Math.trunc(a / (1 << comboOperand));
        break;
      case 1:
        // bxl - bitwise xor
        b = Number(BigInt(b) ^ BigInt(operand));
        break;
      case 2:
        // bst - modulo 8
        b = comboOperand % 8;
        break;
      case 3:
        // jnz - jump if not zero
        if (a > 0) {
          ip = comboOperand;
          continue;
        }
        break;
      case 4:
        // bxc - bitwise xor c
        b = Number(BigInt(b) ^ BigInt(c));
        break;
      case 5:
        // out - output
        output.push(comboOperand % 8);
        break;
      case 6:
        // bdv - division
        b = Math.trunc(a / (1 << comboOperand));
        break;
      case 7:
        // cdv - division
        c = Math.trunc(a / (1 << comboOperand));
        break;
    }
    ip++;
  }

  return output;
};

const runTests = () => {
  const tests = [
    {
      reg: [0, 0, 9],
      ins: [
        [2, 6],
        [5, 5],
      ],
      res: [1],
    },
    {
      reg: [10, 0, 0],
      ins: [
        [5, 0],
        [5, 1],
        [5, 4],
      ],
      res: [0, 1, 2],
    },
    {
      reg: [2024, 0, 0],
      ins: [
        [0, 1],
        [5, 4],
        [3, 0],
      ],
      res: [4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0],
    },
    {
      reg: [0, 29, 0],
      ins: [
        [1, 7],
        [5, 5],
      ],
      res: [2],
    },
  ];

  tests.forEach((test, i) => {
    let out = performInstructions(test.ins, test.reg);
    console.log("TEST", i, test.res, out);
  });
};
