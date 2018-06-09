import React from 'react';
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
@connect(
  state=>state
)
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
    const chatList = Object.values(msgGroup)//这样就变成了一个数组每个数组就装了一组对话
    console.log(chatList)
    // console.log(msgGroup)
    const Item = List.Item
    const Brief = Item.Brief
    return (
      <div>
        <List>
          {chatList.length&&chatList.map(v=>{
            const lastItem = this.getLastMsg(v)
            const targetId = v[0].from==userid?v[0].to:v[0].from

            const name = userinfo[targetId]?userinfo[targetId].name:''
            const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
            console.log(targetId)
            return(
              <Item 
                key = {lastItem._id}
                thumb={require(`../img/${avatar}.png`)}
              >
              {lastItem.content}
              <Brief>{name}</Brief>
            </Item>
            )
           
          })}
        </List>
      </div>
      
    );
  }
}

export default Msg;