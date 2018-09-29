import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserList} from '@/chatUser.redux'
// import UserCard from 'com/usercard/usercard'
import {List, Badge} from 'antd-mobile';


class Msg extends Component {
    componentDidMount() {
        // this.props.getUserList(1)
    }

    //获取最后一条信息
    getLast(arr) {
        return arr[arr.length - 1];
    }

    render() {
        /* let chatMsgList = this.props.chat.chatMsg;
         if(!chatMsgList.length) {
         return
         }*/
        //按照聊天用户分组，根据chatid
        const Item = List.Item;
        const Brief = Item.Brief;
        const msgGroup = {};
        const userId = this.props.user._id;//当前用户登录的id
        const userInfo = this.props.chat.users;//聊天用户信息
        this.props.chat.chatMsg.forEach(v => {
            msgGroup[v.chatId] = msgGroup[v.chatId] || [];
            msgGroup[v.chatId].push(v);
        })
        //进行 消息排序 最新的消息在最前面
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last;
        });
        // console.log(chatList)

        return (
            <div>
                {chatList.map(v => {
                    const lastItem = this.getLast(v);
                    const targetId = v[0].from == userId ? v[0].to : v[0].from;
                    //未读消息数量
                    const unreadNum = v.filter(v => !v.read && v.to == userId).length
                    if (!userInfo[targetId]) return null;
                    {/*图片引入 记得 require*/}
                    return (
                        <List key={lastItem._id}>
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`img/${userInfo[targetId].avatar}.png`)}
                                arrow="horizontal"
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {lastItem.content}
                                <Brief>{userInfo[targetId].name}</Brief>
                            </Item>
                        </List>

                    )
                })}
            </div>
        )
        /*<UserCard userList={this.props.userList}></UserCard>*/

    }
}

//编程式导航(withRouter用法)
export default withRouter(connect(state => state, {getUserList})(Msg))
/*.chatuser*/