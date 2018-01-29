
let saveUserSocketId  = function(userId, socketId){
    let _sql = ' UPDATE  user_info SET socketid = ? WHERE id= ? limit 1 '
  return query( _sql,[userId,socketId])
}


let getUserSocketId  = function(toUserId){
    let _sql = 'select socketid from user_info where id=? limit 1 '
    return query( _sql,[userId,socketId])
}

module.exports = {
    saveUserSocketId,
    getUserSocketId
}
