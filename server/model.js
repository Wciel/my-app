const mongoose = require('mongoose')
//connect链接数据库,并使用my-app这个集合
const DB_URL = 'mongodb://localhost:27017/my-app'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
}) //检测mongodb是连接
const models = {
	user:{
		'user':{type:String, 'require':true},
		'pwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		//头像
		'avatar':{'type':String},
		// 个人简介或者职位简介
		'desc':{'type':String},
		// 职位名
		'title':{'type':String},
		// 如果你是boss 还有两个字段
		'company':{'type':String},
		'money':{'type':String}
	},
	chat:{
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}