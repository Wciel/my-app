import React from 'react';
import axios from 'axios'
import　{withRouter} from 'react-router-dom' //router4给我们提供的一个可以将普通组件包裹成路由组件
import {connect} from 'react-redux'
import {loginData} from '../../redux/user.redux'
@withRouter
@connect(
    null,
    {loginData}
)
class AuthRoute extends React.Component {
    componentDidMount() {
        // const publicList = ['/login','/register']
        // const pathname = this.props.location.pathname
        // console.log(this.props.location.pathname)
        // if (publicList.indexOf(pathname>-1)){
        //     return null
        // }
        //获取用户信息
        axios.get('/user/info')
            .then(res=>{
                if(res.status === 200) {
                    if(res.data.code == 0) {
                        console.log("有登录信息")
                        this.props.loginData(res.data.data)
                        console.log(res)
                    }else{
                        this.props.history.push('/login')
                    }
                }
            })

        // 是否登录
        // 现在的url地址，　login是不是需要跳转的

        // 用户的type 身份是Boss还是genius
        // 用户是否完善信息（选择头像，个人简介）
    }
    render() {
        return (
           <div>
            
           </div> 
        );
    }
}
export default AuthRoute;