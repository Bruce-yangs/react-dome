import React from 'react'
import Logo from 'com/logo/logo'
import {connect} from 'react-redux'
import {login} from '@/user.redux'
import {Redirect} from 'react-router-dom'

import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile'



/*function WrapperHellow(Comp) {
    class WrapComp extends React.Component{
        render() {
            return(
                <div>
                    <p>高阶组件</p>
                    <Comp >{this.props}</Comp>
                </div>
            )
        }
    }
    return WrapComp
}
@WrapperHellow()
class Hello extends React.Component{
    render(){
        return <h2>hellow imooc I lover react</h2>
    }
}*/
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',//用户名
            pwd: ''//密码
        }
    }
    //点击注册
    register() {
        this.props.history.push('/register')
    }
    //点击登录
    handleLogin() {
        this.props.login(this.state)
    }
    //输入账号密码
    handleChange(key,val) {
        this.setState({
            [key]:val
        })
    }


    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo} />: null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                        <InputItem clear onChange={v=>this.handleChange('user',v)}>用户</InputItem>
                        <InputItem clear type="password" onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin.bind(this)}>登录</Button>
                    <WhiteSpace />
                    <Button type="ghost" onClick={this.register.bind(this)}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(state=>state.user,{login})(Login)