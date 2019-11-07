const groupService = {

  createGroup(db, group_name) {
    return db('fse_group')
      .insert(group_name)
      .returning('*')
      .then(([data]) => data)
  },
  getGroupName(db, id) {
    return db('fse_group')
      .where({id})
      .then(group => group)
  }

}

module.exports = groupService