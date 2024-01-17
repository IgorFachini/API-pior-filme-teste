const express = require('express');
const app = express();
const { initializeDatabase } = require('./database');

const db = initializeDatabase();

const AWARDS_MIN_QUANTITY = 2;

function getIntervalAwards (winningMovies) {
    const moviesByProducer = winningMovies.reduce((acc, movie) => {
        const key = movie.producer;
        acc[key] = acc[key] || [];
        acc[key].push(movie);
        return acc;
    }, {});

    const intervals = [];

    Object.entries(moviesByProducer).forEach(([producer, movies]) => {
        movies.sort((a, b) => a.year - b.year);
        if (movies.length >= AWARDS_MIN_QUANTITY) {
            movies.forEach((movie, index) => {
                const nextMovie = getNextMovie(movies, index);
                if (nextMovie) {
                    const interval = {
                        producer,
                        previousWin: movie.year,
                        followingWin: nextMovie.year,
                        interval: nextMovie.year - movie.year,
                    };
                    intervals.push(interval);
                }
            });
        }
    });

    const min = intervals.filter(
        producerInterval =>
            producerInterval.interval === Math.min(...intervals.map(interval => interval.interval))
    );

    const max = intervals.filter(
        producerInterval =>
            producerInterval.interval === Math.max(...intervals.map(interval => interval.interval))
    );

    return { min, max };
}

function getNextMovie (winningMovies, index) {
    if (index < 0 || index + 1 === winningMovies.length) {
        return null;
    }
    return winningMovies[index + 1];
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
        const intervalWinners = getIntervalAwards(rows);

        res.json(intervalWinners);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
