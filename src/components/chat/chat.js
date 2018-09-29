import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '@/chat.redux'
/*import {Redirect} from 'react-router-dom'*/
import {List, WhiteSpace, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {getChatId} from 'js/util'

import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
        //此处为了解决表情初始化问题 组件Grid
       this.resize();
        /*socket.on('recvMsg', (data)=> {
         console.log(data)
         this.setState({
         msg:[...this.state.msg,data.text]
         })
         })*/
    }
    //当我们退出页面的时候 获取读取数量
    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to);
    }

    resize() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 0)
    }

    //点击发送消息
    handleSubmit() {
        // socket.emit('sendMsg',this.state)
        const from = this.props.user._id;
        const to = this.props.match.params.user;//发送给谁
        const msg = this.state.text;
        //发送信息websocket
        this.props.sendMsg({from, to, msg});
        this.setState({
            text: '',
            showEmoji:false
        })
    }
    isShowEmoji() {
        this.setState({
            showEmoji:!this.state.showEmoji
        });
        this.resize();
    }

    render() {
        const emoji = '😁 😁 😂 ☺ ️🤔 😤 🙈 🙄 😁 😁 😂 ☺ ️🤔 😤 🙈 🙄 😁 😁 😂 ☺ ️ 🤔 😤 🙈 🙄 😁 😁 😂 ☺ ️🤔 😤 🙈 🙄'
            .split(' ')
            .filter(v => v)
            .map(v => ({
                text: v
            }))
        const userId = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        const chatId = getChatId(userId, this.props.user._id);
        const chatMsg = this.props.chat.chatMsg.filter(v => v.chatId === chatId);
        if (!users[userId]) {
            return null;
        }
        return (
            <div id="chat-page">
                <NavBar mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => this.props.history.goBack()}
                >{users[userId].name}</NavBar>

                {chatMsg.map(v => {
                    const avatar = require(`img/${users[v.from].avatar}.png`);
                    return v.from === userId ? (
                        <List key={v._id}>
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item className="chat-me" extra={<img src={avatar}/>}>{v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={(v) => {
                                this.setState({text: v})
                            }}
                            onKeyDown ={(e)=>{
                                if(e.keyCode === 13) this.handleSubmit();
                            }}
                            extra={
                                <div>
                                    <span style={{marginRight: 15}} onClick={() =>this.isShowEmoji()}>🐻</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                            // onExtraClick
                        ></InputItem>
                    </List>
                    {/*此处点击发送表情 el.text就是点击的表情*/}
                    {this.state.showEmoji?
                    <Grid
                        data={emoji}
                        columnNum={8}
                        carouselMaxRow={3}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text:this.state.text+el.text
                            })
                        }}
                    />:null}
                </div>
            </div>
        )
    }
}
//编程式导航(withRouter用法)
export default  withRouter(connect(state => state, {getMsgList, sendMsg, recvMsg, readMsg})(Chat))