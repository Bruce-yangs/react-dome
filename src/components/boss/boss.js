import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserList} from '@/chatUser.redux'
import UserCard from 'com/usercard/usercard'


class Boss extends Component {
    componentDidMount() {
        this.props.getUserList(1)
    }
    render() {
        return <UserCard userList={this.props.userList}></UserCard>
    }
}
//编程式导航(withRouter用法)
export default withRouter(connect(state => state.chatuser, {getUserList})(Boss))