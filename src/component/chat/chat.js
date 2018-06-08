import React from 'react'
import io from 'socket.io-client'
import {List,InputItem} from 'antd-mobile'
const socket = io('ws://localhost:9093')//因为我们现在是跨域的，前端的端口在3000，后端的在9093所以要手动链接一下
socket.on('recvmsg',function(data){
  console.log(data)
})

class Chat extends  React.Component {

  constructor(props){
    super(props)
    this.state={text:'',msg:[]}
  }
  componentDidMount(){
    socket.on('recvmsg',(data)=>{
      this.setState({
        msg:[...this.state.msg,data.text]
      })
    })
  }
  handleSubmit(){
    socket.emit('sendmsg',{text:this.state.text})
    this.setState({
     text:''
    })
  }
  render() {
    return (
      <div>
        {this.state.msg.map((v)=>{
          return <p key={v}>{v}</p>
        })}
        <div className = 'stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({
                  text:v
                })
              }}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
            >
            </InputItem>
          </List>
        </div>
      </div>
    );
  }
}

export default Chat;