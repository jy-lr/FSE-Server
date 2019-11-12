const groupService = {

  createGroup(db, group_name) {
    return db('fse_group')
      .insert(group_name)
      .returning('*')
      .then(([data]) => data)
  },
  getGroupName(db, id) {
    return db('fse_group')
      .where('fse_group.id', id)
      .join('current_equity', 'current_equity.groupid', '=', 'fse_group.id')
      .join('user_group', 'user_group.groupid', '=', 'fse_group.id')
      .select('*')
      .then(group => group)
  },
  

}

module.exports = groupService