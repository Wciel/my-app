import React from 'react';
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {logoutSubmit} from '../../redux/user.redux'
import '../../index.css'
@connect(
  state=>state.user,
  {logoutSubmit}
)
class User extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout(){
    // browserCookie.erase('userid')
    // window.location.href = window.location.href//强制刷新页面但并不是我们所需要的,这样不好
    // console.log('logout')
    const alert = Modal.alert
    alert('注销','确认退出登录？',[
      {text:'取消',onPress:()=>{console.log('sak')}},
      {text:'确认',onPress:()=>{
    　   browserCookie.erase('userid')
    // 　　　window.location.href = window.location.href
        　this.props.logoutSubmit() //上面是清除cookie,这里是清除redux里面的数据
      }}
    ])
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user?(
      <div>
        
        <Result 
          img={<img　alt="图片" src={require(`../img/${this.props.avatar}.png`)} style={{width:50}}/> } alt="" 
          title={props.user}
          message={props.type=='boss'?props.company:null}
          />
        <List renderHeader={()=>'简介'}>
          <Item  multipleLine>
            {props.title}
            {this.props.desc.split('/n').map(v=>(
              <Brief key={v}>{v}</Brief>
            ))}
            {props.money?<Brief>薪资：{props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout} >退出登录</Item>
        </List>
        <h2>个人中心页面</h2>
      </div>
    ):<Redirect to={props.RedirectTo}/>;
  }
}

export default User;