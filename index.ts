import { parseArgs } from "util";

const DATA_PATH = "./data/";
const TEST_DATA_PATH = "./testdata/";

const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        day: {
            type: 'string',
        },
    },
    strict: true,
    allowPositionals: true,
});

const readFile = async (path: string) => {
    const input = await Bun.file(path);
    if (!input.exists()) {
        console.error("File not found");
        return;
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

    // Run the test input if it exists
    const testInput = await readTestInput(day);
    if (testInput) {
        import("./solutions/" + day + ".ts").then((module) => {
            console.log("Running test input for day " + day);
            console.log("Solution A:");
            module.solutionA(testInput);
            console.log("Solution B:");
            module.solutionB(testInput);
            console.log("----------------------------");
        });
    }

    // Run the actual input or return if it doesn't exist
    const input = await readInput(day);
    if (!input) {
        console.error("No input found for day " + day);
        return;
    }

    import("./solutions/" + day + ".ts").then((module) => {
        console.log("Running real input for day " + day);
        console.log("Solution A:");
        module.solutionA(input);
        console.log("Solution B:");
        module.solutionB(input);
    });
}

solve(values.day);
