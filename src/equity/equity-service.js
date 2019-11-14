const equityService = {

  addEquity(db, newEquity) {
    return db('current_equity')
      .insert(newEquity)
      .returning('*')
      .then(([data]) => data)
  },
  getEquity(db, groupid) {
    return db('current_equity')
      .where({groupid})
      .select('*')
      .then(data => data)
  },
  deleteEquity(db, id) {
    return db('current_equity')
      .where({id})
      .delete()
  },
  updateEquity(db, id, num_of_shares) {
    return db('current_equity')
      .where({id})
      .update({num_of_shares})
      .select('*')
      .then(data => data)
  }

}

module.exports = equityService