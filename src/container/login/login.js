import React from 'react';
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import '../../index.css'
@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:''
        }
        this.register = this.register.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }
    register(){
        // console.log(this); //看看路由组件有什么东西
        this.props.history.push('./register') //路由组件就可以这样
    }
    handleChange(key,v){
        this.setState({
            [key]:v
        })
    }
    handleLogin(){
        this.props.login(this.state)
        console.log(this.props.RedirectTo)
    }
    render() {
        return (
           <div>
           {this.props.RedirectTo? <Redirect to={this.props.RedirectTo} />:null}
            <Logo></Logo>
            <WingBlank>
            <List>
                {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
                <WhiteSpace />
                <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
            </List>
            <Button type='primary' onClick={this.handleLogin}>登录</Button>
			<WhiteSpace />
			<Button onClick={this.register} type='primary'>注册</Button>
            </WingBlank>
           </div>
        );
    }
}

export default Login;