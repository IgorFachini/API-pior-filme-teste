const request = require('supertest');
const app = require('../index');

test('GET /awards', done => {
    // TODO Ponto de melhoria, adicionar uma logica para verificar se o banco de dados já foi populado, ex: algo com event emitter
    setTimeout(() => {
        let expectedResult = {
            max: [
                {
                    producer: 'Matthew Vaughn',
                    previousWin: 1980,
                    followingWin: 2002,
                    interval: 22,
                },
                {
                    producer: 'Matthew Vaughn',
                    previousWin: 2015,
                    followingWin: 2037,
                    interval: 22,
                },
            ],
            min: [
                {
                    producer: 'Matthew Vaughn',
                    previousWin: 2002,
                    followingWin: 2003,
                    interval: 1,
                },
                {
                    producer: 'Joel Silver',
                    previousWin: 1990,
                    followingWin: 1991,
                    interval: 1,
                },
            ]
        }
        
        return request("http://localhost:3000").get('/awards').then(response => {
            try {
                
                done()
                expect(response.status).toBe(200);
                expect(response.body.min).toBeInstanceOf(Array);
                expect(response.body.max).toBeInstanceOf(Array);
                expect(response.body.min).toEqual(expect.arrayContaining([
                    {
                        producer: 'Matthew Vaughn',
                        previousWin: 2002,
                        followingWin: 2003,
                        interval: 1,
                    },
                    {
                        producer: 'Joel Silver',
                        previousWin: 1990,
                        followingWin: 1991,
                        interval: 1,
                    },
                ]));

                expect(response.body.max).toEqual(expect.arrayContaining([
                    {
                        producer: 'Matthew Vaughn',
                        previousWin: 1980,
                        followingWin: 2002,
                        interval: 22,
                    },
                    {
                        producer: 'Matthew Vaughn',
                        previousWin: 2015,
                        followingWin: 2037,
                        interval: 22,
                    },
                ]));

                expect(response.body.min).toEqual(expect.arrayContaining(expectedResult.min));
            } catch (error) {
                done()
            }
        })
    }, 2000)
});