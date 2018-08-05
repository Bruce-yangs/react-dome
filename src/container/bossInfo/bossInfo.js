import React from 'react'
import AvatarSelecor from 'com/avatar-selecor/avatar-selecor'
import {connect} from 'react-redux'
import {update} from '@/user.redux'
import {Redirect} from 'react-router-dom'

import {List, InputItem, WhiteSpace, WingBlank, Button, NavBar , TextareaItem} from 'antd-mobile'

class BossInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',//招聘职位
            company: '',//公司
            money: '',//薪资
            desc: '',//描述
            avatar: ''//头像
        }
    }
    //输入账号密码
    handleChange(key,val) {
        this.setState({
            [key]:val
        })
    }
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect!==path?<Redirect to={redirect} />: null}
                <NavBar mode="dark" >BOSS完善信息页</NavBar>
                <AvatarSelecor selectAvatar={(imgName)=>{
                    this.setState({
                        avatar:imgName
                    })
                }}></AvatarSelecor>
                    <List>
                        <InputItem clear onChange={v=>this.handleChange('title',v)}>招聘职位</InputItem>
                        <InputItem clear  onChange={v=>this.handleChange('company',v)}>公司名称</InputItem>
                        <InputItem clear  onChange={v=>this.handleChange('money',v)}>职位薪资</InputItem>
                        <TextareaItem title="职位要求" clear
                                      placeholder="请输入相关要求" rows={4} autoHeight
                                      onChange={v=>this.handleChange('desc',v)} />
                    </List>
                    <WhiteSpace />
                <Button type="primary" onClick={()=>{this.props.update(this.state)}}>保存</Button>

            </div>
        )
    }
}

export default connect(state=>state.user,{update})(BossInfo)