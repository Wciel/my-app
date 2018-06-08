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
const app = express()
//work width express要将http的接口与soket.io的接口相互统一起来
// const server = require('http').Server(app) //用http将server包一层，然后再将server传给io对象
// const io = require('socket.io')(server)　//io和express已经关联起来了


const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection',function(socket){
	socket.on('sendmsg',function(data){ //这里要用socket因为这是这次链接的请求，io是全局的请求
		io.emit('recvmsg',data) //将接受到的东西发送到全局，每个人都是接收的状态
	})
}) //io.on简体能事件．看是否链接起来了

const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})