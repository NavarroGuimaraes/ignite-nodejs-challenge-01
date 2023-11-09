import { Database } from "./database/database.js";
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build-route-path.js";
import { validateTaskBody } from "./utils/validate-task-body.js";
import fs from 'node:fs';
import { importCSV } from "./utils/import-csv.js";

const database = new Database();

export const routes = [
    { 
        method: 'GET',
        path: buildRoutePath('/hello'),
        handler: (req, res) => {
            res.end('Hello World!');
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {

            // the function returns a string if its missing required params
            const isMissingRequiredParams = validateTaskBody(req.body);

            if (isMissingRequiredParams) {
                res.statusCode = 400;
                return res.end(missingParamsMessage);
            }

            const { title, description } = req.body;

            const task = database.insert('tasks', {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date().toISOString(),
                updated_at: null
            });

            res.statusCode = 201;
            res.end(JSON.stringify(task));

        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {

            const { search } = req.query;

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null);

            return res.end(JSON.stringify(tasks));

        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.params;

            const isMissingRequiredParams = validateTaskBody(req.body);

            if (isMissingRequiredParams) {
                res.statusCode = 400;
                return res.end(missingParamsMessage);
            }

            const { title, description } = req.body;
            const updated = database.update('tasks', id, { title, description });

            if (!updated) {
                res.statusCode = 404;
                return res.end('Not Found');
            }

            res.statusCode = 200;
            res.end(JSON.stringify(updated));

        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.params;
            
            const deleted = database.delete('tasks', id);

            if (!deleted) {
                res.statusCode = 404;
                return res.end('Not Found');
            }

            res.statusCode = 204;
            return res.end();

        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {

            const { id } = req.params;

            const task = database.update('tasks', id, {
                completed_at: new Date().toISOString()
            });

            if (!task) {
                res.statusCode = 404;
                return res.end('Not Found');
            }

            res.statusCode = 200;
            res.end(JSON.stringify(task));

        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks/import'),
        handler: async (req, res) => {

            const tasks = await importCSV();

            console.log(tasks);

            tasks.forEach(task => {

                database.insert('tasks', {
                    id: randomUUID(),
                    title: task.title,
                    description: task.description,
                    completed_at: null,
                    created_at: new Date().toISOString(),
                    updated_at: null
                });
            });

            res.statusCode = 201;
            res.end('Imported successfully');
            
        }
    }
];