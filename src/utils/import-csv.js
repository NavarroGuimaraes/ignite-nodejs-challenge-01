import fs from 'node:fs';
import { parse } from 'csv-parse';

const filePath = new URL('../../import-ignite.csv', import.meta.url);

export async function importCSV() {

    const tasks = [];

    const parser = fs.createReadStream(filePath).pipe(parse({
        columns: true,
        skip_empty_lines: true,
    }));

    for await (const row of parser) {
        tasks.push(row);
    }

    return tasks;

}