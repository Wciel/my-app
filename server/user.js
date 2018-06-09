const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'_v':0} //隐藏pwd和_v
Router.get('/list',function(req,res){
    const {type} = req.query //get请求参数用query获取，post请求参数用body获取
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})
Router.post('/login',function(req,res){
    const {user,pwd} = req.body
    User.findOne({user,pwd},_filter,function(err,doc){
		if (!doc) {
			return res.json({code:1,msg:'用户名或者密码错误'})
		}
		res.cookie('userid', doc._id)
		return res.json({code:0,data:doc})
	})
})

// Router.get('/getmsglist',function(req,res){
//     const user = req.cookies.userid //获取服务器上存着的的用户id
    // User.find({},function(e,userdoc){
    //     let users = {} //将查找出来的用户换成对象形式
    //     userdoc.forEach(v=>{
    //         users[v._id] = {name:v.user,avatar:v.avatar}
    //     })
    //     //$or查询多个条件,将谁发的和发给谁的查出来
    //     Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
    //         if(!err){
    //             return res.json({code:0,msgs:doc,users:users}) /* 这里是将我们数据库的列表查出来返回给前端，
    //                                                              接下来在前端把数据放到redux上*/
    //         }
    //     })
    // })
// })
Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid

	User.find({},function(e,userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if (!err) {
				return res.json({code:0,msgs:doc, users:users})
			}
		})
	})
	// {'$or':[{from:user,to:user}]}

})

Router.post('/update',function(req, res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body) //将传进来的消息和之前的用户名和Type合并
        return res.json({code:0,data})
    })//查找更新
})
 

//在注册的时候旧将id放入了cookie里面
Router.post('/register', function(req,res){
    const {user,pwd,type} = req.body //es6解构
    User.findOne({user},function(err,doc){
		if (doc) {
			return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd})
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user, type, _id} = d
            res.cookie('userid',_id) //重点是一定要返回一个cookie
            return res.json({code:0,data:{user,type, _id}})
        })
    })
})

// User.remove({},function(err,doc){
//     console.log(doc)
// })
//这里使用路由对象进行挂载
Router.get('/info',function(req,res){
    //user有没有cookie,读cookie是在请求req里面读，写cookie是在res里面写
    const {userid} = req.cookies
    if (!userid) {
		return res.json({code:1})
	}
	User.findOne({_id:userid},_filter, function(err,doc){
		if (err) {
			return res.json({code:1, msg:'后端出错了'})
		}
		if (doc) {
			return res.json({code:0,data:doc})
		}
    })

})
function md5Pwd(pwd){
	const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router