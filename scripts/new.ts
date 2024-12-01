import { parseArgs } from "util";

const SOLUTIONS_PATH = "./solutions/";
const TEMPLATE_FILE = "./solutions/0.ts";
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

    const templateFile = await Bun.file(TEMPLATE_FILE);

    if (!templateFile.exists()) {
        console.error("Template file not found");
        return;
    }

    if (await Bun.file(SOLUTIONS_PATH + day + ".ts").exists()) {
        console.error("Solution file already exists at " + SOLUTIONS_PATH + day + ".ts");
        console.error("You must delete it before creating a new one");
        return;
    }

    await Bun.write(SOLUTIONS_PATH + day + ".ts", templateFile);
    console.log("Solution file created at " + SOLUTIONS_PATH + day + ".ts");
}

main(values.day);