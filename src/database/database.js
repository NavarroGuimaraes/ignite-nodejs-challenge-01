import fs from 'node:fs/promises';

const databasePath = new URL('./tasks.json', import.meta.url);

export class Database {
    
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
        .then(data => {

            // if the file exists, we parse it and store it in memory
            this.#database = JSON.parse(data);

        })
        .catch(() => {

            // calling persist here will create the file if it doesn't exist
            this.#persist()

        });
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    insert(table, data) {
        
        if (!this.#database[table]) {
            this.#database[table] = [];
        }

        this.#database[table].push(data);

        this.#persist();

        return data;

    }

    select(table, where = null) {
            
            if (!this.#database[table]) {
                return [];
            }
    
            if (!where) {
                return this.#database[table];
            }
    
            return this.#database[table].filter(row => {
                // Object.entries will create a list from a given object
                // this will trasnform the where clause from { title: 'My Task', description: 'My Task' } 
                // to [['title', 'My Task'], ['description', 'My Task']]
                // this way we can iterate over each key and value of the where clause
                // the some method will return true if any of the entries matches the where clause
                return Object.entries(where).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase());
                });

            });
    }

    update(table, id, newData) {
           
        const row = this.#database[table].findIndex(row => {
            return row.id === id
        });

        console.log(row);

        if (row === -1) {
            return null;
        }

        const currentData = this.#database[table][row];

        const {title, description, completed_at} = newData;

        const newTask = {
            id,
            title: title || currentData.title,
            description: description || currentData.description,
            completed_at: completed_at || currentData.completed_at,
            created_at: currentData.created_at,
            updated_at: new Date().toISOString()
        };

        this.#database[table][row] = newTask;

        this.#persist();

        return newTask;
    }

    delete(table, id) {

        if (!this.#database[table]) {
            return null;
        }

        const row = this.#database[table].findIndex(row => {
            return row.id === id
        })

        if (row <= -1) {
            return null;
        }

        const deleted = this.#database[table].splice(row, 1);
        this.#persist();

        return deleted;

    }

}