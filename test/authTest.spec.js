const request = require('supertest')
const app = require('../app')

const Auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY0ODg5ODAyN30.8ZjtLMMt9Jjf5FGqkoHMEElz--12Tni59ttUoKH8wgs'

describe('POST /api/register', () => {
    test('return status: 400 because of missing credential', done => {
        const email = 'jk@gmail.com';
        const password = '123456';
        request(app)
            .post('/api/register')
            .send({ email, password})
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('result');
                expect(res.body).toHaveProperty('message');
                expect(res.body.result).toEqual('failed');
                done();
            })
    })
    test('return status: 400 because of existing user', done => {
        const email = 'admin@mail.com'
        const password = 'admin2'
        const username = 'admin'
        request(app)
            .post('/api/register')
            .send({ email, username, password})
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('result');
                expect(res.body).toHaveProperty('message');
                expect(res.body.result).toEqual('failed');
                expect(res.body.message).toEqual('Email already existed');
                done();
            })
    })
    test('return status: 400 because password is less than 6 characters', done => {
        const email = 'jk@gmail.com';
        const password = '12345';
        const username = 'jk'
        request(app)
            .post('/api/register')
            .send({ email, username, password})
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('result');
                expect(res.body).toHaveProperty('message');
                expect(res.body.result).toEqual('failed');
                expect(res.body.message).toEqual('Please make your password bigger than 6 characters');
                done();
            })
    })
    test('return status: 400 because email is not in the right format', done => {
        const email = 'jkmail.com';
        const password = '123456';
        const username = 'jk'
        request(app)
            .post('/api/register')
            .send({ email, username, password})
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('result');
                expect(res.body).toHaveProperty('message');
                expect(res.body.result).toEqual('failed');
                expect(res.body.message).toEqual('Please enter valid email address');
                done();
            })
    })
    test('return status: 200 with a register profile', done => {
        const email = '2@gmail.com';
        const password = '123456';
        const username = 'jk'
        request(app)
            .post('/api/register')
            .send({ email, username, password})
            .then(res => {
                expect(res.statusCode).toBe(201)
                expect(res.body).toHaveProperty('message')
                expect(res.body).toHaveProperty('data')
                expect(res.body.message).toEqual("Account has successfully registered!")
                expect(res.body.data).toHaveProperty('email')
                expect(res.body.data).toHaveProperty('username')
                expect(res.body.data.email).toEqual(email)
                expect(res.body.data.username).toEqual(username)
                done();
            })
    })
    
})

describe('POST /api/login', () => {
    test('return status: 400 login failed because the wrong credentials', done => {
        const email = 'jk@gmail.com';
        const password = '12346';
        request(app)
            .post('/api/login')
            .send({ email, password})
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('result');
                expect(res.body).toHaveProperty('message');
                expect(res.body.result).toEqual('Login failed!');
                expect(res.body.message).toEqual('Try entering the right credentials');
                done();
            })
            
    })
    test('return status: 201 login success', done => {
        const email = 'jk@gmail.com';
        const password = '123456';
        // const username = 'dnd'
        request(app)
            .post('/api/login')
            .send({ email, password})
            .then(res => {
                expect(res.statusCode).toBe(201)
                expect(res.body).toHaveProperty('result')
                expect(res.body).toHaveProperty('message')
                expect(res.body).toHaveProperty('data')
                expect(res.body.result).toEqual("Login success")
                expect(res.body.message).toEqual("Login successfully")
                expect(res.body.data).toHaveProperty('id')
                expect(res.body.data).toHaveProperty('email')
                expect(res.body.data).toHaveProperty('accessToken')
                expect(res.body.data.email).toEqual(email)
                done();
            })
    })
})


describe('Update Score Method', () => {
    test('Score berhasil', done => {
        const gameID = 1;
        const point = 1;
        // const Auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY0ODcyMTI4NX0.3C3AhVZdrnNx3NAG5xV72gtJtWAvb_uRWTrRiWPWDdI'
        request(app)
            .post('/api/score')
            .set('Authorization', Auth)
            .send({gameID, point})
            .then(res => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toHaveProperty('result')
                expect(res.body).toHaveProperty('message')
                expect(res.body.result).toEqual('success')
                expect(res.body.message).toEqual('point updated!')
                done()
            })
        })
    })
describe('Get Game Details', () => {
    test('game detail berhasil diambil', done => {
        request(app)
            .get('/api/gamedetail/1')
            .then(res => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toHaveProperty('result')
                expect(res.body).toHaveProperty('message')
                expect(res.body).toHaveProperty('data')
                expect(res.body.result).toEqual('success')
                expect(res.body.message).toEqual('Game with certain id')
                done()
            })
        })
    })

    describe('test: token', () => {
        test('verifytoken', done => {
            const id = 2;
            const email = 'admin@mail.com';
            // const Auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA3LCJlbWFpbCI6ImZhdXphbnRlc3QxQGdtYWlsLmNvbSIsImlhdCI6MTY0ODgwMDAxMn0.YARVD5GM4lDaUWf4Xg0wGaG2JqcCryOIib4SlD5-_3w'
            request(app)
                .get('/api/verifyToken')
                .set('Authorization', Auth)
                // .send({gameID, point})
                .then(res => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.result).toHaveProperty('err')
                    expect(res.body.result).toHaveProperty('result')
                    expect(res.body.result.result).toHaveProperty('id')
                    expect(res.body.result.result).toHaveProperty('email')
                    expect(res.body.result.result.id).toEqual(id)
                    expect(res.body.result.result.email).toEqual(email)
                    done();
                })
            })
        })
    
        describe('GET /api/me', () => {
            test('test: profile me', done => {
                // const Auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJlbWFpbCI6ImZhdXphbnRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjQ4NDU2ODEyfQ.pcVDNXzE2YXAx4gTv1cpQiAJsrCgeEAZGe2kMDzNDKw';
                const id = 2;
                const username = 'admin';
                const email = 'admin@mail.com';
                request(app)
                    .get('/api/me')
                    .set( 'Authorization' , Auth)
                    .then(res => {
                        expect(res.statusCode).toBe(200)
                        expect(res.body).toHaveProperty('result')
                        expect(res.body).toHaveProperty('message')
                        expect(res.body).toHaveProperty('data')
                        expect(res.body.result).toEqual('success')
                        expect(res.body.message).toEqual('Here is your own info')
                        expect(res.body.data).toHaveProperty('id')
                        expect(res.body.data).toHaveProperty('username')
                        expect(res.body.data).toHaveProperty('email')
                        expect(res.body.data.id).toEqual(id)
                        expect(res.body.data.username).toEqual(username)
                        expect(res.body.data.email).toEqual(email)
                        done();
                    })
            })
        })
    
    describe('GET /api/me', () => {
        test('return status: 401 Unauthorized', (done) => {
            request(app)
            .get('/api/me')
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
        })
    })

    // jest.setTimeout(12000)
    
    describe('GET /api/all', () => {
        test('test: all user', done => {
            request(app)
                .get('/api/all')
                .then(res => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body).toHaveProperty('result')
                    expect(res.body).toHaveProperty('message')
                    expect(res.body).toHaveProperty('data')
                    expect(res.body.result).toEqual('success')
                    expect(res.body.message).toEqual('Showing all available user')
                    done();
                })
        })
    })

    describe('GET /api/user/101', () => {
        test('test: user 101', done => {
            const id = 2;
            const email = 'admin@mail.com';
            const username = 'admin'
            request(app)
                .get('/api/user/2')
                .then(res => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body).toHaveProperty('result')
                    expect(res.body).toHaveProperty('message')
                    expect(res.body).toHaveProperty('data')
                    expect(res.body.result).toEqual('success')
                    expect(res.body.message).toEqual('Successfully retrieved user')
                    expect(res.body.data).toHaveProperty('id')
                    expect(res.body.data).toHaveProperty('email')
                    expect(res.body.data).toHaveProperty('username')
                    expect(res.body.data.id).toEqual(id)
                    expect(res.body.data.email).toEqual(email)
                    expect(res.body.data.username).toEqual(username)
                    done();
                })
        })
    })

