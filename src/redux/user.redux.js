import axios from "axios"
import {getRedirectPath} from '../util' //获取一个纯函数，传入的信息来判断跳转到哪里
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_DATA = 'LOGIN_DATA'
const LOGOUT = 'LOGOUT'
const AUTH_SUCESS = 'AUTH_SUCESS' //验证成功
const initState = {
    RedirectTo:'',
    msg:'',
    user:'',
    type:'',
    avatar:''
}
//reducer
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCESS:
            return {...state,msg:'',RedirectTo:getRedirectPath(action.payload),...action.payload}
        case LOGIN_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOGOUT:
            return {...initState,RedirectTo:'/login'}
        default:
            return state
    }
}


function authSuccess(obj){
    const {pwd,...data} = obj //这句是解构，将pwd隐藏起来
    return {type:AUTH_SUCESS,payload:data}
}
function errorMsg(msg){
    return {msg, type:ERROR_MSG}
}

export function update(data){
    return dispatch =>{
        axios.post('/user/update',data) 
            .then(res=>{
                if(res.status===200 && res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }
                else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function loginData(userinfo){
    return {type:LOGIN_DATA, payload:userinfo}
}

export function logoutSubmit(){
    return {type:LOGOUT}
}

//登录检测
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户密码必须输入')
    }
    // 这里是异步匹配
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if (res.status==200 && res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })		
    }

}

//检测输入判断注册
export function register({user,pwd,repeatpwd,type}) {
    if(!user||!pwd||!type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd!==repeatpwd){
        return errorMsg('密码和确认密码不同')
    }
　　　//这里是异步
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if (res.status==200&&res.data.code===0) {
                    // console.log(res)
                    dispatch(authSuccess({user,pwd,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })		
    }
    
}