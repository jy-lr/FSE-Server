const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NzQ0NTQ3NTUsInN1YiI6ImFkbWluIn0.RJFmaKv1o5-6ZcUvr6sWhqItIKj2CeHSoQEjH7-cIJw'
const knex = require('knex');
const app = require('../src/app');
const { makeUsersArray } = require('./fixtures/user.fixtures');
const { makeGroupsArray } = require('./fixtures/group.fixtures');
const { makeEquityArray } = require('./fixtures/equity.fixtures');

describe('equity-endpoints', function(){
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

    describe('POST EQUITY', () => {
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
            const newEquity = {
              userid: 1,
              stock_symbol: "AAPL",
              num_of_shares: 10,
              groupid: 1
          }

            return supertest(app)
            .post('/api/equity')
            .send(newEquity)
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(201)
        })
    })

    describe('GET EQUITY', () => {
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
          return supertest(app)
            .get('/api/equity?groupid=1')
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(200)
        })
    })

    describe('PATCH EQUITY', () => {
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
          const updateEquity = {
            id: 1,
            num_of_shares: 15
          }

          return supertest(app)
            .patch('/api/equity')
            .send(updateEquity)
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(200)
        })
    })
})