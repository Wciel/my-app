
const express = require('express')
const bodyParser = require('body-parser') //专门来接收post参数
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')

import csshook from 'css-modules-require-hook/preset'
import assetHook from 'asset-require-hook'　//这两个要放在上面，即Import，app之前，为了支持css


assetHook({
    extensions: ['png'],
    limit: 8000
})
import React from 'react'
import {renderToString,renderToNodeStream} from 'react-dom/server'
import staticPath from '../build/asset-manifest.json'　
import {Provider} from 'react-redux'
import App from '../src/app.js'
import {StaticRouter} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../src/reducers'
import thunk from 'redux-thunk'
// import staticPath from '../build/asset-manifest.json'
import axios from 'axios'
import {loadData} from '../src/redux/user.redux'

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection',function(socket){
	// console.log('user login')
	socket.on('sendmsg',function(data){
		const {from, to, msg} = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function(err,doc){
			io.emit('recvmsg', Object.assign({},doc._doc))　
		})
	})
})
const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter) //中间件第一种，前面写路由前缀
app.use(function(req,res,next){
	if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
		return next()
	}
	const store = createStore(reducers, compose(
		applyMiddleware(thunk)
	))
	let context = {}
	const markup = renderToString(
		(<Provider store={store}>
		 	<StaticRouter
			 location = {req.url}
       context = {context}
			 >
			 	<App></App>
			 </StaticRouter>
		</Provider>)

	)
	
	
	const page = `<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			<meta name="theme-color" content="#000000">
			<link rel="stylesheet" href="/${staticPath['main.css']}">
			<meta name="description" content="React开发招聘 App" />
			<meta name="keywords" content="React,Redux,SSR,React-router,Socket.io" />
			<meta name="author" content="Imooc" >
			<title>Redux+React Router+Node.js全栈开发聊天App</title>
	
		</head>
		<body>
			<noscript>
				You need to enable JavaScript to run this app.
			</noscript>
			<div id="root">${markup}</div>
			<script src="/${staticPath['main.js']}"></script>
		</body>
	</html>
	
		`
		return res.send(page)
})
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})



// Chat.remove({},function(err,doc){

// })

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
//work width express要将http的接口与soket.io的接口相互统一起来
// const server = require('http').Server(app) //用http将server包一层，然后再将server传给io对象
// const io = require('socket.io')(server)　//io和express已经关联起来了
// io.on('connection',function(socket){
// 	socket.on('sendmsg',function(data){ //这里要用socket因为这是这次链接的请求，io是全局的请求
// 		// console.log(data)
// 		// io.emit('recvmsg',data) //将接受到的东西发送到全局，每个人都是接收的状态
// 		const {from,to,msg} = data
// 		const chatid = [from,to].sort().join('_')
// 		Chat.create({chatid,from,to,contet:msg},function(err,doc){
// 			io.emit('recvmsg',Object.assign({},doc._doc))
// 		})
// 	})
// }) //io.on简体能事件．看是否链接起来了
// console.log(renderToString(<App></App>))

//设置白名单
// app.use(function(req,res,next){
// 	if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
// 			return next()
// 	}//只要我们路径不是接口或者static开头的，我们就去执行我们要渲染的
// 	// console.log('path reslove',path.resolve('build/index.html'))　//打印出来的是本地项目的绝对路径，这样就不会出什么错误
// 	const senfiel = renderToString(<App></App>)
// 	// return res.sendFile(path.resolve('build/index.html'))
// 	res.send(senfiel)
// })//第二种写一个函数
// app.use('/',express.static(path.resolve('bulid')))//在express里面把build生成我们的静态资源地址
// app.use(express.static(path.join(__dirname, 'build/static')))