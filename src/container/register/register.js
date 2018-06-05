import React from 'react';
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import　Logo from '../../component/logo/logo'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import '../../index.css'
@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'',
            boss:''
        }
    }
    handleChange(key,v){
        this.setState({
            [key]:v
        })
    }
    handleRegister(){
        this.props.register(this.state)
        console.log(this.props.redirectTo)
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
            {this.props.RedirectTo? <Redirect to={this.props.RedirectTo} />:null}
            <Logo></Logo>
            <WingBlank> {/*两翼留白*/}
            <List>
                {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                <WhiteSpace />
                <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
                <InputItem type = 'password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                <InputItem type = 'password' onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                <WhiteSpace />
                <RadioItem onChange={()=>this.handleChange('type','genius')}
                           checked ={this.state.type == 'genius'} >
                    应聘者
                </RadioItem>
                <RadioItem onChange={()=>this.handleChange('type','boss')}
                           checked ={this.state.type == 'boss'}  >
                    BOSS
                </RadioItem>
                <WhiteSpace />
                <Button type='primary' onClick={()=>{this.handleRegister()}}>注册</Button>
            </List>
            </WingBlank>
            </div>
        );
    }
}

export default Register;