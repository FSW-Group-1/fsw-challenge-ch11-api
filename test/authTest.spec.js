const request = require('supertest')
const app = require('../app')

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
        const password = 'admin'
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
        const email = 'jk@gmail.com';
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