// const express = require('express')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const userRouter = require('./user')

// const app = express()
// app.use('/user',userRouter) //这里是开启一个中间件，如果中间件是路由的话就先输一个前缀一个地址，是＇／user＇
//                             //userRouter是./user下的子路由即为　'./info'
// app.use(cookieParser())
// app.use(bodyParser.json())//解析post传过来的json数据
// app.listen(9093,function(){
//     console.log("node app start at port 9093")
    
// })
const express = require('express')
const bodyParser = require('body-parser') //专门来接收post参数
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.listen(9093,function(){
	console.log('Node app start at port 9093')
})