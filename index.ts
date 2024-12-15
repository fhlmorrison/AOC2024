import { parseArgs } from "util";

const DATA_PATH = "./data/";
const TEST_DATA_PATH = "./testdata/";

const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    day: {
      type: "string",
    },
    test: {
      type: "boolean",
    },
    real: {
      type: "boolean",
    },
  },
  strict: true,
  allowPositionals: true,
});

const readFile = async (path: string) => {
  const input = await Bun.file(path);
  if (!(await input.exists())) {
    return null;
  }
  return await input.text();
};

const readInput = async (day: string) => {
  const path = DATA_PATH + day + ".txt";
  return await readFile(path);
};

const readTestInput = async (day: string) => {
  const path = TEST_DATA_PATH + day + ".txt";
  return await readFile(path);
};

async function solve(day?: string) {
  if (!day) {
    console.error("Please provide a day");
    return;
  }

  if (values.test && values.real) {
    console.error("Please provide only one of --test or --real");
    return;
  }

  // Run the test input if it exists
  const testInput = await readTestInput(day);

  if (testInput && !values.real) {
    import("./solutions/" + day + ".ts")
      .then((module) => {
        console.log("Running test input for day " + day);
        console.log("Solution A:");
        module.solutionA(testInput);
        console.log("Solution B:");
        module.solutionB(testInput);
        console.log("-----------------------------");
      })
      .catch((e) => {
        console.error("No solution found for day " + day + e);
      });
  }

  if (values.test) {
    return;
  }

  // Run the actual input or return if it doesn't exist
  const input = await readInput(day);
  if (!input) {
    console.error("No input found for day " + day);
    return;
  }

  import("./solutions/" + day + ".ts")
    .then((module) => {
      console.log("Running real input for day " + day);
      console.log("Solution A:");
      module.solutionA(input);
      console.log("Solution B:");
      module.solutionB(input);
    })
    .catch((e) => {
      console.error("No solution found for day " + day);
    });
}

solve(values.day);
