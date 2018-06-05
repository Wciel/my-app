import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

function Boss(params) {
  return <h2> Boss首页</h2>
}
function Genius(params) {
  return <h2> Genius</h2>
}
function Msg(params) {
  return <h2> Msg</h2>
}
function User(params) {
  return <h2> User</h2>
}
@connect(
  state=>state.user,

)
class Dashboard extends React.Component {

  
  render() {
    const user = this.props.user
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        component:Boss,
        // hide:user.type='genius'
      },
      {
        path:'/genius',
        text:'boss',
        icon:'job',
        title:'Boss列表',
        component:Genius,
        // hide:user.type='boss'
      },
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:Msg
      },
        {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User
      },


    ]
   
    return (
      <div>Dashboard
      <NavBar mode='dard'></NavBar>
      <h2>footer</h2>



      {/* <Route path=></Route> */}

      </div>
    );
  }
}

export default Dashboard;