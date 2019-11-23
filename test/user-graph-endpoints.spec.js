const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NzQ0NTQ3NTUsInN1YiI6ImFkbWluIn0.RJFmaKv1o5-6ZcUvr6sWhqItIKj2CeHSoQEjH7-cIJw'
const knex = require('knex');
const app = require('../src/app');
const { makeUsersArray } = require('./fixtures/user.fixtures');
const { makeGroupsArray } = require('./fixtures/group.fixtures');
const { makeEquityArray } = require('./fixtures/equity.fixtures');

describe('graph-endpoints', function(){
    let db;

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: 'postgresql://fse_admin@localhost/fse_Test',
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup',() => db.raw('TRUNCATE fse_group, fse_users, current_equity RESTART IDENTITY CASCADE'))

    afterEach('cleanup',() => db.raw('TRUNCATE fse_group, fse_users, current_equity RESTART IDENTITY CASCADE'))

    describe('POST GRAPH', () => {
      const testUsers = makeUsersArray();
      const groups = makeGroupsArray();

      beforeEach('insert Users', () => {
          return db 
          .into('fse_users')
          .insert(testUsers)
      })

      beforeEach('insert Groups', () => {
        return db 
        .into('fse_group')
        .insert(groups)
      })

        it('responds with 201', () => {
            const newGraph = {
              id: 1,
              groupid: 1,
              userid: 1,
              equity: 10000
          }

            return supertest(app)
            .post('/api/usergraph')
            .send(newGraph)
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(201)
        })
    })

    describe('PATCH GRAPH', () => {
      const testUsers = makeUsersArray();
      const groups = makeGroupsArray();
      const equity = makeEquityArray();

      beforeEach('insert Users', () => {
          return db 
          .into('fse_users')
          .insert(testUsers)
      })

      beforeEach('insert Groups', () => {
        return db 
        .into('fse_group')
        .insert(groups)
      })

      beforeEach('insert equity', () => {
        return db 
        .into('current_equity')
        .insert(equity)
      })

        it('responds with 200', () => {
          const updatedGraph = {
            id: 1,
            equity: 4000,
            groupid: 1
          }

          return supertest(app)
            .patch('/api/usergraph')
            .send(updatedGraph)
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(200)
        })
    })
})