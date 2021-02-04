const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/Users') 
const config = require('./config/key')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log('MonggoDB Connected..'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world!!!'))

app.post('/register', (req,res)=> {
  //회원가입 정보를 가져와서 데이터베이스에 넣기
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success:true
    })
  })

})




app.listen(port, () => console.log(`Example app listening on ${port}!`))

