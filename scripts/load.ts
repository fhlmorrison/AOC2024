import { parseArgs } from "util";

const DATA_PATH = "./data/";
const YEAR = 2024;

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

const url = (day: number) => `https://adventofcode.com/${YEAR}/day/${day}/input`;

async function loadData(day: number) {
    const response = await fetch(url(day), {
        method: 'GET',
        headers: {
            "Cookie": `session=${process.env.AOC_SESSION}`
        }
    });
    if (!response.ok) {
        console.error("Failed to load data: " + response.statusText);
        return;
    }
    return await response.text();
}

async function main(dayParam?: string) {
    if (!dayParam) {
        console.error("Please provide a day");
        return;
    }
    const day = parseInt(dayParam);
    if (isNaN(day)) {
        console.error("Day must be a number");
        return;
    }
    const inputData = await loadData(day);
    if (!inputData) {
        console.error("No input found for day " + day);
        return;
    }
    await Bun.write(DATA_PATH + day + ".txt", inputData);
    console.log("Input data saved to " + DATA_PATH + day + ".txt");
}

main(values.day);