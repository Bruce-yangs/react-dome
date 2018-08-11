import React from 'react'
import Logo from 'com/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '@/user.redux'

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            type: 1,//或者Boss
            user: '',//用户名
            pwd: '',//密码
            repeatpwd: '',
        }
    }

    handleChange(key,val) {
        this.setState({
            [key]:val
        })
    }
    //点击注册
    handleRegister() {
        this.props.register(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem;
        const data = [
            { value: 1, label: '牛人' },
            { value: 2, label: 'Boss' },
        ];
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                {/*<h2>注册页</h2>*/}
                <List>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                    <InputItem clear onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
                    <WhiteSpace />
                    <InputItem clear type="password" onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                    <WhiteSpace />
                    <InputItem clear type="password" onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    <WhiteSpace />
                    {data.map(i => (
                        <RadioItem key={i.value} checked={this.state.type === i.value} onChange={()=> this.handleChange('type',i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                    <WhiteSpace />
                    <Button type="primary" onClick={()=>this.handleRegister()}>注册</Button>
                </List>
            </div>
        )
    }
}
//connect 语法
export default connect(
    state=>state.user,
    {register}
)(Register)
