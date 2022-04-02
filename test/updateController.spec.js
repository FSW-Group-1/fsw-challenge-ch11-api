const request = require('supertest')
const app = require('../app')


const token =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY0ODg5ODAyN30.8ZjtLMMt9Jjf5FGqkoHMEElz--12Tni59ttUoKH8wgs'

describe('POST /api/me/update', () => {
  test('return status: 401 Unauthorized', (done) => {
    request(app)
      .post('/api/me/update')
      .then((res) => {
        expect(res.statusCode).toBe(401)
        done()
      })
  })

  test('return status: 200 with a success update profile', (done) => {
    const username = 'admin'
    const description = 'hello my name is admin'
    const imageLink = null
    request(app)
      .post('/api/me/update')
      .set('Authorization', token)
      .send({ username, description, imageLink })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('result')
        expect(res.body).toHaveProperty('message')
        expect(res.body.result).toEqual('success')
        expect(res.body.message).toEqual('Info sucessfully updated')
        done()
      })
  })
})
