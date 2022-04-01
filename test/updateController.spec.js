const request = require('supertest')
const app = require('../app')

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxkYW5hbGlmcmlvQGdtYWlsLmNvbSIsImlhdCI6MTY0ODgwMjMyNH0.HVTlfyYucvcc_bnltA26jc7e0271c_Rek5oYyq061ho'

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
    const username = 'wildan'
    const description = 'hello my name is wildan'
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
