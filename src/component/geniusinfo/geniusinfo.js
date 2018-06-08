import React from 'react';
import {NavBar, InputItem,TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends React.Component {
    constructor(props){
        super(props)
        this.state={
            title:'',
            desc:'',
            compay:'',
            money:'',
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.RedirectTo
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.RedirectTo}></Redirect>:null}
                <NavBar mode="dark"> 牛人信息完善页面 </NavBar>
                <AvatarSelector 
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}
                ></AvatarSelector>
                <InputItem　onChange={(v)=>this.handleChange('title',v)}>
                  求职岗位
                </InputItem>
                <TextareaItem　onChange={(v)=>this.handleChange('desc',v)} rows={3} autoHeight title='职位要求'>
              
                </TextareaItem>
                <Button type='primary'　onClick={()=>{
                    this.props.update(this.state)
                }}>保存</Button>
            </div>
        );
    }
}

export default GeniusInfo;