const userGroupServices = {
  insertUserGroup(db, insertUser) {
    return db('user_group')
      .insert(insertUser)
      .returning('*')
      .then(([data]) => data)
  },
  getAllUsersGroup(db, userid) {
    return db('user_group')
      .where({userid})
      .select('*')
      .then(data => data)
  },
  getAllGroupsUsersWithUserName(db, groupid) {
    console.log(groupid)
    return db('user_group')
      .where('user_group.groupid', groupid)
      .join('fse_group', 'fse_group.id', '=', 'user_group.groupid')
      .join('fse_users', 'fse_users.id', '=', 'user_group.userid')
      .select('fse_group.group_name', 'fse_group.date_created', 'cash_balance', 'fse_users.user_name')
      .then(data => data)
  }

}

module.exports = userGroupServices

// getSavedWeights(db, user_id) {
//   return db('exercise_tracking')
//     .join('days_table', 'days_table.id', '=', 'exercise_tracking.day_id')
//     .join('exercises_table', 'exercises_table.id', '=', 'exercise_tracking.exercise_id')
//     .where('user_id', user_id)
//     .select('exercise_tracking.max_value', 'exercise_tracking.id', 'days_table.day_name', 'exercises_table.exercise_name')
//     .then(data => data)
// }
// }