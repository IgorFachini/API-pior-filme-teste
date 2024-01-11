const fs = require('fs');
const csv = require('csv-parser');
const sqlite3 = require('sqlite3').verbose();

const initializeDatabase = () => {
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS studios (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS producers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, year INTEGER, title TEXT, studiosId INTEGER, producersId INTEGER, winner TEXT, FOREIGN KEY(studiosId) REFERENCES studios(id), FOREIGN KEY(producersId) REFERENCES producers(id))');

        const studiosMap = new Map();
        const producersMap = new Map();

        db.serialize(() => {
            const insertFilme = db.prepare('INSERT INTO filmes (year, title, studiosId, producersId, winner) VALUES (?, ?, ?, ?, ?)');

            fs.createReadStream('resources/movielist.csv')
                .pipe(csv({ separator: ';'}))
                .on('data', (data) => {
                    
                    data.producers.replace(/ and /gi, ", ").split(", ").forEach(producer => {
                        const row = {
                            year: data.year,
                            title: data.title,
                            studios: data.studios,
                            producers: producer,
                            winner: data.winner
                        };
                        const studioName = row.studios;
                        const producerName = row.producers;
                        
                        if (!studiosMap.has(studioName)) {
                            const newStudioId = studiosMap.size + 1;
                            studiosMap.set(studioName, newStudioId);
                            db.run('INSERT INTO studios (id, name) VALUES (?, ?)', newStudioId, studioName);
                        }

                        if (!producersMap.has(producerName)) {
                            const newProducerId = producersMap.size + 1;
                            producersMap.set(producerName, newProducerId);
                            db.run('INSERT INTO producers (id, name) VALUES (?, ?)', newProducerId, producerName);
                        }

                        const insertFilme = db.prepare('INSERT INTO filmes (year, title, studiosId, producersId, winner) VALUES (?, ?, ?, ?, ?)');
                        insertFilme.run(row.year, row.title, studiosMap.get(studioName), producersMap.get(producerName), row.winner);
                        insertFilme.finalize();
                    });
                })
                .on('end', () => {
                    console.log('Dados do CSV adicionados ao banco de dados');
                });
        });
    });

    return db;
};

module.exports = { initializeDatabase };