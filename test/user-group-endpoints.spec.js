const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NzQ0NTQ3NTUsInN1YiI6ImFkbWluIn0.RJFmaKv1o5-6ZcUvr6sWhqItIKj2CeHSoQEjH7-cIJw'
const knex = require('knex');
const app = require('../src/app');
const { makeUsersArray } = require('./fixtures/user.fixtures');
const { makeGroupsArray } = require('./fixtures/group.fixtures');
const { makeUserGroupsArray } = require('./fixtures/user-group.fixtures');

describe('user-group-endpoints', function(){
    let db;

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: 'postgresql://fse_admin@localhost/fse_Test',
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup',() => db.raw('TRUNCATE fse_group, fse_users, user_group RESTART IDENTITY CASCADE'))

    afterEach('cleanup',() => db.raw('TRUNCATE fse_group, fse_users, user_group RESTART IDENTITY CASCADE'))

    describe('POST USER-GROUP', () => {
      const testUsers = makeUsersArray();
      const testGroup = makeGroupsArray();

      beforeEach('insert Users', () => {
          return db 
          .into('fse_users')
          .insert(testUsers)
      })

      beforeEach('insert Group', () => {
        return db 
        .into('fse_group')
        .insert(testGroup)
      })

        it('responds with 201', () => {
            const newUserGroup = {
              userid: 1,
              groupid: 1,
              cash_balance: 10000
          }

            return supertest(app)
            .post('/api/usergroup')
            .send(newUserGroup)
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(201)
        })
    })

    describe('GET USER-GROUP', () => {
      const testUsers = makeUsersArray();
      const testGroup = makeGroupsArray();
      const testUserGroup = makeUserGroupsArray();

      beforeEach('insert Users', () => {
          return db 
          .into('fse_users')
          .insert(testUsers)
      })

      beforeEach('insert Group', () => {
        return db 
        .into('fse_group')
        .insert(testGroup)
      })

      beforeEach('insert UserGroup', () => {
        return db 
        .into('user_group')
        .insert(testUserGroup)
      })

        it('responds with 200', () => {
            return supertest(app)
            .get('/api/usergroup')
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(200)
        })
    })

    describe('PATCH USER-GROUP', () => {
      const testUsers = makeUsersArray();
      const testGroup = makeGroupsArray();
      const testUserGroup = makeUserGroupsArray();

      beforeEach('insert Users', () => {
          return db 
          .into('fse_users')
          .insert(testUsers)
      })

      beforeEach('insert Group', () => {
        return db 
        .into('fse_group')
        .insert(testGroup)
      })

      beforeEach('insert UserGroup', () => {
        return db 
        .into('user_group')
        .insert(testUserGroup)
      })

        it('responds with 200', () => {
            const updateUserGroup = {
              id: 1,
              cash_balance: 9000
          }

            return supertest(app)
            .patch('/api/usergroup')
            .send(updateUserGroup)
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(200)
        })
    })
})