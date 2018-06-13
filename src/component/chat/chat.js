import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import '../../index.css'
import { getChatId } from '../../util';
import QueueAnim from 'rc-queue-anim'
@connect(
  state =>state,
  {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends  React.Component {

  constructor(props){
    super(props)
    this.state={text:'',msg:[]}
  }
  // componentDidMount(){
  //   if(!this.props.chat.chatmsg.length) {
  //     this.props.getMsgList()
  //     this.props.recvMsg()　//这个页面接收消息
  //   } 
  // }
  //  //组件被移除或者被隐藏的时候触发，当前组件一离开就会被干掉
  //  componentWillUnmount(){
  //   const to = this.props.match.params.user
  //   this.props.readMsg(to)
  //  }

  componentDidMount(){
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()	
		}
	}
	componentWillUnmount(){
    console.log('unmount')
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
  fixCarousel(){
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    },0)//解决图片没有任何值，但是仍然是占了高度的问题
  } //修正跑马灯

  handleSubmit(){
    const from = this.props.user._id //是谁发的就是是谁登录的
    const to = this.props.match.params.user //这是发给谁的路径在url里就是你点击之后
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})　//发送每条消息给后台
    this.setState({
     text:'',
     showEmoji:false
    })
  }
  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
    .split(' ')
    .filter(v=>v)
    .map(v=>({text:v}))

    const userid = this.props.match.params.user //对方的id
    const Item = List.Item
    const users = this.props.chat.users
    const chatid = getChatId(userid,this.props.user._id)　//这里是用来区分是谁发送给谁的，就是实现一对一的对话，避免信息泄漏

    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
    if(!users[userid]) {
      return null //如果没有用户或者没有用户id这个页面就不用渲染了
    }
    return (
      <div>
        <NavBar 
            mode='dark'
            icon={<Icon type="left" />}
				  	onLeftClick={()=>{
						this.props.history.goBack()
					}}>
          {users[userid].name}
        </NavBar>
        <QueueAnim type='left' delay={100}>
          {chatmsgs.map((v)=>{
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from === userid?(
              <List key={v._id}>
                <Item
                thumb={avatar}
                >{v.content}</Item>
              </List>
            ): (<List key={v._id}>
                <Item
                  extra={<img alt='图片' src={avatar}/>}
                  className='chat-me'
                >{v.content}</Item>
              </List>)
          })}
        </QueueAnim>
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
              extra={
                <div>
                  <span
                  　role="img"
                    onClick={()=>{
                      this.setState({
                        showEmoji:!this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                    style={{marginRight:15}}
                  >😂</span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>
              }
            >
            </InputItem>
          </List>
          {this.state.showEmoji?(<Grid
            data={emoji}//一行显示9个
            columnNum={9}//一共4列
            carouselMaxRow={4}//是不是跑马灯
            isCarousel={true}
            onClick={el=>{
              this.setState({
                text:this.state.text+el.text
              })
            }}
          />):null}
        </div>
      </div>
    );
  }
}

export default Chat;