const equityService = {

  addEquity(db, newEquity) {
    return db('current_equity')
      .insert(newEquity)
      .returning('*')
      .then(([data]) => data)
  },
  getEquity(db, userid, groupid) {
    return db('current_equity')
      .where({groupid})
      .select('*')
      .then(data => data)
  }

}

module.exports = equityService