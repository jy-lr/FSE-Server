const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NzQ0NTQ3NTUsInN1YiI6ImFkbWluIn0.RJFmaKv1o5-6ZcUvr6sWhqItIKj2CeHSoQEjH7-cIJw'
const knex = require('knex');
const app = require('../src/app');
const { makeUsersArray } = require('./fixtures/user.fixtures');

describe('group-endpoints', function(){
    let db;

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: 'postgresql://fse_admin@localhost/fse_Test',
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup',() => db.raw('TRUNCATE fse_group, fse_users RESTART IDENTITY CASCADE'))

    afterEach('cleanup',() => db.raw('TRUNCATE fse_group, fse_users RESTART IDENTITY CASCADE'))

    describe('POST GROUP', () => {
      const testUsers = makeUsersArray();

      beforeEach('insert Users', () => {
          return db 
          .into('fse_users')
          .insert(testUsers)
      })

        it('responds with 201', () => {
            const newGroup = {
            group_name: "cool"
            }

            return supertest(app)
            .post('/api/group')
            .send(newGroup)
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(201)
        })
    })
})