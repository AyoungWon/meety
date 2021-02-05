const { User } = require('../models/Users')
let auth = (req, res, next) => {

  //안증처리하는 곳
  //client cookie에서  token 가져오기
  let token = req.cookies.x_auth;  

  // token decode 후에 유저찾기
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({
      isAuth: false, error: true
    })
     // 유저가 있으면 ok
    req.token = token;
    req.user = user;
    next();
  })
 

}

module.exports(auth)