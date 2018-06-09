import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')/*
                                          因为我们现在是跨域的，前端的端口在3000，
                                          后端的在9093所以要手动链接一下
                                        */
//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
// //标识已读
// const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg:[],
  users:{},
  unread:0
}
export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST:
      return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length}
    case MSG_RECV:
      const n = action.payload.to === action.userid?1:0
      return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
    // case MSG_READ:
    default:
      return state
  }
}

function msgList(msgs,users,userid){
  return{type:'MSG_LIST',payload:{msgs,users,userid}}
}

function msgRecv(msg,userid){
  return{type:'MSG_RECV',payload:msg,userid}
}

export function recvMsg(){
  return (dispatch,getState)=>{
    socket.on('recvmsg',function(data){　
      const userid = getState().user._id
      dispatch(msgRecv(data,userid))//接收信的信息，并把新的信息加到信息栏里面
    })
  }
}


// export function sendMsg(from, to, msg){
//   return dispatch=>{
//     socket.emit('sendmsg',{from,to,msg}) //发送给后台
//   } //必须返回的是一个对象或者函数
  
// }
export function sendMsg({from ,to ,msg}){
	return dispatch=>{
		socket.emit('sendmsg',{from ,to ,msg}) //把发送的每条信息发送给后端
	}
}

//这里是获得联系人的信息
export function getMsgList(){
  //getState是获取我们redux的所有的状态
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status === 200 && res.data.code ===0){
          const userid = getState().user._id
          // console.log(getState().user._id)
          dispatch(msgList(res.data.msgs,res.data.users,userid))
        }
      })
  }
}