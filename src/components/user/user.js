import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutSubmit} from '@/user.redux'
import {Redirect} from 'react-router-dom'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies'

class User extends Component {

    loginOut() {
        const alert = Modal.alert;
        alert('退出', '确定退出吗?', [
            { text: '取消', onPress: () =>'', style: 'default' },
            { text: '确定', onPress: () => {
                browserCookie.erase('userId');
                // window.location.href = window.location.href; /*不太优雅*/
                this.props.logoutSubmit();
            } },
        ]);
    }
    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;

        return props.user?(
            <div>

                <Result
                    img={<img src={require(`img/${props.avatar}.png`)}
                      style={{width:50}}
                    />}
                    message={props.type===2?props.company:null}
                    title={props.title}
                />
                <List renderHeader={()=>'简介'} >
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money?<Brief>{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.loginOut.bind(this)}>退出登录</Item>
                </List>
            </div>
        ): <Redirect to={props.redirectTo} />
    }
}
//编程式导航(withRouter用法)
export default withRouter(connect(state => state.user, {logoutSubmit})(User))