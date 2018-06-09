import React from 'react';
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
@connect(
  state=>state
)

//１，eslint代码校验工具，２，react16特有的错误处理机制３，react优化４，同步消息数量
class Msg extends React.Component {
  

  getLastMsg(arr){
    return arr[arr.length-1]
  }
  render() {
    //将用户安from-to分组
    const msgGroup = {}
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // console.log(Object.values({name:'ciel',age:'18'})) //Object.values就是将key不要了将剩下的拼成字符串
    
    //这样就变成了一个数组每个数组就装了一组对话
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLastMsg(a).create_time
      const b_last = this.getLastMsg(b).create_time
      return b_last - a_last
    })
    const Item = List.Item
    const Brief = Item.Brief
    return (
      <div>
          {chatList.length&&chatList.map(v=>{
            const lastItem = this.getLastMsg(v)
            const targetId = v[0].from===userid?v[0].to:v[0].from
            const unreadNum = v.filter(val=>!val.read&&val.to===userid).length
            const name = userinfo[targetId]?userinfo[targetId].name:''
            const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
            return(
              <List　key = {lastItem._id}>
                <Item 
                  extra = {<Badge text={unreadNum}></Badge>}
                  thumb={require(`../img/${avatar}.png`)}
                  arrow="horizontal"//水平方向的箭头
                  onClick={()=>{
                    this.props.history.push(`/chat/${targetId}`)
                  }}
               　　 >
                  {lastItem.content}
                  <Brief>{name}</Brief>
             　 </Item>
            </List>
            )
          })}
      </div>
      
    );
  }
}

export default Msg;