import React from 'react';
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import MyappForm from '../../component/my-app-form/my-app-form'
import '../../index.css'

//属性代理
// function WrapperHello(Comp){
//     class WrapComp extends React.Component{
//         render(){
//             return (
//                 <div>
//                     <p>这是ＨＯＣ高阶组件特有的元素</p>
//                     <Comp　name='hello' {...this.props}></Comp> {/*添加了Name属性为属性代理*/}
//                 </div>
//             )
//         }
//     }
//     return WrapComp
// }

//反向继承　主要用于渲染的节时
// function WrapperHello(Comp){
//     class WrapComp extends Comp{
//         componentDidMount(){
//             console.log('高阶组件新增的生命周期，加载完成')
//         }
//         render(){
//             return (
//                 <div>
//                     <Comp　name='hello' {...this.props}></Comp> {/*添加了Name属性为属性代理*/}
//                 </div>
//             )
//         }
//     }
//     return WrapComp
// }

// @WrapperHello //相当于Hello函数被WrapperHello包裹住了
// class Hello extends React.Component{
//     render(){
//         return<h2>haha</h2>
//     }
// }
// function WrapperHello(fn){
//     return function(){
//         console.log('before say hello')
//         fn()
//         console.log('after say hello')
//     }
//}//函数可以做参数，可以做返回值，函数式编程虽然hello名字一样但是其中已经发生了很大的变化
// hello = WrapperHello(hello) = @WrapperHello
// hello()

//所谓高阶函数就是给一个组件，再返回另一个组件，返回的组件将原来的组件包裹一层这样我们就能在原有的基础上增加一些功能
//我们使用高阶组件的最主要的作用就是代码的复用和逻辑的抽象

@connect(
    state=>state.user,
    {login}
)
@MyappForm
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state={
           
        }
        this.register = this.register.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }
    register(){
        // console.log(this); //看看路由组件有什么东西
        this.props.history.push('./register') //路由组件就可以这样
    }
    handleLogin(){
        this.props.login(this.props.state)
    }
    render() {
        return (
           <div>
           {this.props.RedirectTo? <Redirect to={this.props.RedirectTo} />:null}
            <Logo></Logo>
            <WingBlank>
            <List>
                {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                <WhiteSpace />
                <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
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