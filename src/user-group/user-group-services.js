const userGroupServices = {
  insertUserGroup(db, insertUser) {
    return db('user_group')
      .insert(insertUser)
      .returning('*')
      .then(([data]) => data)
  },
  getAllUsersGroup(db, userid) {
    return db('user_group')
      .where('user_group.userid', userid)
      .join('fse_group', 'fse_group.id', '=', 'user_group.groupid')
      .join('fse_users', 'fse_users.id', '=', 'user_group.userid')
      .select( 'user_group.groupid','fse_group.group_name', 'fse_group.date_created', 'cash_balance', 'user_group.id', 'fse_users.id as userid', 'fse_users.user_name', 'fse_group.id as groupid')
      .then(data => data)
  },
  getAllGroupsUsersWithUserName(db, groupid) {
    return db('user_group')
      .where('user_group.groupid', groupid)
      .join('fse_group', 'fse_group.id', '=', 'user_group.groupid')
      .join('fse_users', 'fse_users.id', '=', 'user_group.userid')
      .select('fse_group.group_name', 'fse_group.date_created', 'cash_balance', 'fse_users.id as userid', 'fse_users.user_name', 'user_group.id', 'fse_group.id as groupid')
      .then(data => data)
  },
  updateBalance(db, id, cash_balance) {
    return db('user_group')
      .where('user_group.id', id)
      .update({cash_balance})
      .returning('*')
      .then(value => value)
  }

}

module.exports = userGroupServices