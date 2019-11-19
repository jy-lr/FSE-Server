const userGraphService = {

  createUserGraphData(db, newUserData) {
    return db('user_graph')
      .insert(newUserData)
      .returning('*')
      .then(([data]) => data)
  },
  getUserGraphData(db, userid) {
    return db('user_graph')
      .where({userid})
      .returning('*')
      .then(data => data)
  },
  updateUserGraphData(db, id, equity) {
    return db('user_graph')
      .where({id})
      .update({equity})
      .select('*')
      .returning('*')
      .then(data => data)
  }
}

module.exports = userGraphService