import React from 'react';
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component {
    static PropTypes = {
        selectAvatar:PropTypes.func
    } //属性传递里面的类型校验，如果传递的类型不正确，便会报错
    constructor(props){
        super(props)
        this.state={
            icon:'',
            text:''
        }
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                          .split(',')
                          .map(v=>({
                            icon:require(`../img/${v}.png`),
                            text:v
                        }))
        const gridHeader = this.state.icon?
                            (<div>
                                <span>已选择头像</span>
                                <img alt="图片" src={this.state.icon} style={{width:20}}/>
                            </div>):'请选择头像'
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList} columnNum={5} 
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    ></Grid>
                </List>

            </div>
        );
    }
}

export default AvatarSelector;