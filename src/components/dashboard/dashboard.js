import React from 'react'
import {connect} from 'react-redux'
import NavLinkBar from 'com/navLinkBar/navLinkBar';
import Boss from 'com/boss/boss';
import Genius from 'com/genius/genius';
import User from 'com/user/user';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    Link, NavLink
} from 'react-router-dom'
import {List, InputItem, WhiteSpace, WingBlank, Button, NavBar, TextareaItem} from 'antd-mobile'

/*function Boss() {
    return <h2>Boss</h2>
}*/
/*function Genius() {
    return <h2>Genius</h2>
}*/
function Msg() {
    return <h2>Msg</h2>
}
/*function User() {
    return <h2>Me</h2>
}*/
class Dashboard extends React.Component {
    /*constructor() {
        super();
        this.state = {
            title: '',//招聘职位
            company: '',//公司
            money: '',//薪资
            desc: '',//描述
            avatar: ''//头像
        }
    }*/

    //输入账号密码
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }







    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        const user = this.props.user;

        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type === 1
            },
            {
                path:'/genius',
                text:'Boss',
                icon:'job',
                title:'Boss列表',
                component:Genius,
                hide:user.type === 2
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'个人',
                icon:'user',
                title:'个人中心',
                component:User
            },
        ];
        return (
            <div>
                {/*{redirect && redirect !== path ? <Redirect to={redirect}/> : null}*/}
                <NavBar mode="dark" className="fixed-header">{navList.find(v=>v.path===path).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route path={v.path} key={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default connect(state => state/*, {update}*/)(Dashboard)