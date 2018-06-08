import React from 'react'

export default function MyappForm(Comp){
  return class WrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state={}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key,v){
      this.setState({
          [key]:v
      })
  }
    render(){
      //传入的this.props叫做属性穿透
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp> 
    }
  }
} //我们在新的组件中为老组件增添了一个方法还有把现有组件的方法传给了老组件