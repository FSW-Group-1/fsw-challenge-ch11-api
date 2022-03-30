const request = require('supertest')
const app = require('../app')

describe('POST /api/register', () => {
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
    test('attempt login success', done => {
        const email = 'jk@gmail.com';
        const password = '123456';
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

describe('GET /api/verifyToken', () => {
        test('test: token', done => {
            const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJlbWFpbCI6ImZhdXphbnRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjQ4NDU2ODEyfQ.pcVDNXzE2YXAx4gTv1cpQiAJsrCgeEAZGe2kMDzNDKw';
            const id = '101';
            const email = 'fauzantest@gmail.com';
            request(app)
                .get('/api/VerifyToken')
                .set( 'Authorization' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJlbWFpbCI6ImZhdXphbnRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjQ4NDU2ODEyfQ.pcVDNXzE2YXAx4gTv1cpQiAJsrCgeEAZGe2kMDzNDKw')
                .then(res => {
                    expect(res.statusCode).toBe(200)
                    expect(res.headers.Authorization).toMatch( Authorization )
                    expect(res.body).toHaveProperty('data')
                    expect(res.body.data).toHaveProperty('id')
                    expect(res.body.data).toHaveProperty('email')
                    expect(res.body.data.id).toEqual(id)
                    expect(res.body.data.email).toEqual(email)
                    done();
                })
        })
    })

    describe('GET /api/me', () => {
        test('test: profile me', done => {
            const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJlbWFpbCI6ImZhdXphbnRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjQ4NDU2ODEyfQ.pcVDNXzE2YXAx4gTv1cpQiAJsrCgeEAZGe2kMDzNDKw';
            const id = '101';
            const email = 'fauzantest@gmail.com';
            request(app)
                .get('/api/me')
                .set( 'Authorization' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJlbWFpbCI6ImZhdXphbnRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjQ4NDU2ODEyfQ.pcVDNXzE2YXAx4gTv1cpQiAJsrCgeEAZGe2kMDzNDKw')
                .then(res => {
                    expect(res.statusCode).toBe(200)
                    expect(res.headers.Authorization).toMatch( Authorization )
                    expect(res.body).toHaveProperty('result')
                    expect(res.body).toHaveProperty('message')
                    expect(res.body).toHaveProperty('data')
                    expect(res.body.result).toEqual('Success')
                    expect(res.body.message).toEqual('Here is your own info')
                    expect(res.body.data).toHaveProperty('id')
                    expect(res.body.data).toHaveProperty('email')
                    expect(res.body.data.id).toEqual(id)
                    expect(res.body.data.email).toEqual(email)
                    done();
                })
        })
    })

jest.setTimeout(12000)

    describe('GET /api/all', () => {
        test('test: all user', done => {
            const id = '101';
            const email = 'fauzantest@gmail.com';
            request(app)
                .get('/api/all')
                .then(res => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body).toHaveProperty('result')
                    expect(res.body).toHaveProperty('message')
                    expect(res.body).toHaveProperty('data')
                    expect(res.body.result).toEqual('Success')
                    expect(res.body.message).toEqual('Showing all available user')
                    expect(res.body.data).toHaveProperty('id')
                    expect(res.body.data).toHaveProperty('email')
                    expect(res.body.data.id).toEqual(id)
                    expect(res.body.data.email).toEqual(email)
                    done();
                })
        })
    })

    describe('GET /api/user/101', () => {
        test('test: user 101', done => {
            const id = '101';
            const email = 'fauzantest@gmail.com';
            const username = 'fauzantest'
            request(app)
                .get('/api/user/101')
                .then(res => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body).toHaveProperty('result')
                    expect(res.body).toHaveProperty('message')
                    expect(res.body).toHaveProperty('data')
                    expect(res.body.result).toEqual('Success')
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