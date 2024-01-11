const express = require('express');
const app = express();
const { initializeDatabase } = require('./database');

const db = initializeDatabase();

function calcIntervalWinners (data) {
    return data.reduce((acc, cur) => {
        if (acc.find(({ producer }) => producer === cur.producer)) {
            return acc
        }

        const followingWin = data.find(({ producer, year }) => producer === cur.producer && year !== cur.year)

        if (followingWin) {
            return [
                ...acc,
                {
                    producer: cur.producer,
                    interval: followingWin.year - cur.year,
                    previousWin: cur.year,
                    followingWin: followingWin.year
                }
            ]
        }

        return [
            ...acc,
            {
                producer: cur.producer,
                interval: 0,
                previousWin: cur.year,
                followingWin: 0
            }
        ]
    }, []).filter(({ interval }) => interval > 0)
}

function getMinAndMaxIntervalProducer (data) {
    const min = data.reduce((acc, cur) => {
        if (acc.interval > cur.interval) {
            return cur
        }

        return acc
    }, { interval: Infinity })

    const max = data.reduce((acc, cur) => {
        if (acc.interval < cur.interval) {
            return cur
        }

        return acc
    }, { interval: -1 })

    return { min: [min], max: [max] }
}

app.get('/awards', (req, res) => {
    db.all(`
        SELECT year,
        producers.name as producer
        FROM filmes JOIN producers ON filmes.producersId = producers.id WHERE winner = "yes"
        ORDER BY year
        `, (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }
        const intervalWinners = calcIntervalWinners(rows);
        const minAndMaxIntervalProducer = getMinAndMaxIntervalProducer(intervalWinners);

        res.json(minAndMaxIntervalProducer);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
