const express = require('express')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server)
const cors = require('cors');
/* const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
  debug: true
}) */

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require('./models/Users') 
const config = require('./config/key')
const { auth } = require('./middleware/auth')

var ExpressPeerServer = require('peer').ExpressPeerServer
var options = { debug: true }
var peerExpress = require('express');
var peerApp = peerExpress();
var peerServer = require('http').createServer(peerApp);
var peerPort = 9000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
//app.use(cors());
peerApp.use('/pp', ExpressPeerServer(peerServer, options));

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log('MonggoDB Connected..'))
  .catch(err => console.log(err))


  app.get('/api/room', (req, res) => {
    console.log('room')

  })

io.on('connection', socket => {
  socket.on('join-room', (roomId) => {
    console.log('룸 조인')
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected')
  })
})




app.get('/api/hello', (req, res) => {
  res.send('Hello world~~~')
})

app.post('/api/users/register', (req,res)=> {
  //회원가입 정보를 가져와서 데이터베이스에 넣기
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success:true
    })
  })

})

app.post('/api/users/login', (req,res) => {
  //요청된 이메일을 데이터베이스에서 찾기
  User.findOne({ email: req.body.email },(err, user)=> {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message:"이메일에 해당하는 로그안 정보가 없습니다"
      })
    }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err,isMatch) => {
      if(!isMatch)
      return res.json({
        loginSuccess: false,
        message:"비밀번호 오류"
      })
       //비밀번호가 맞다면 토큰생성
      user.generateToken((err,user) => {
        if(err) return res.status(400).send(err);
        //토큰을 (쿠키, 로컬스토리지 등에) 저장한다.
        res.cookie("x_auth",user.token) 
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        })
      })

    } )
  })
})

app.get('/api/users/auth', auth, (req,res) => {

  //middleware(auth)를 통과해 auth가 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name:req.user.name,
    lastname: req.res.lastname,
    role: req.user.role,
    image:req.user.image 
  })
})

app.get('/api/users/logout',auth, (req,res) => {
  User.findOneAndUpdate({ _id: req.user._id},
    { token: ""}
    , (err,user) => {
      if(err) return res.json({ success: false, err});
      return res.status(200).send({
        success: true
      })
    })
})

const port = 5000
server.listen(port, () => console.log(`Example app listening on ${port}!`))
peerServer.listen(peerPort);
