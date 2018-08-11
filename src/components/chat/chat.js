import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '@/chat.redux'
/*import {Redirect} from 'react-router-dom'*/
import {List, WhiteSpace, InputItem,NavBar} from 'antd-mobile';
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

        this.props.getMsgList();
        this.props.recvMsg();
        /*socket.on('recvMsg', (data)=> {
         console.log(data)
         this.setState({
         msg:[...this.state.msg,data.text]
         })
         })*/
    }

    //点击发送消息
    handleSubmit() {
        // socket.emit('sendMsg',this.state)
        const from = this.props.user._id;
        const to = this.props.match.params.user;//发送给谁
        const msg = this.state.text;
        //发送信息websocket
        this.props.sendMsg({from, to, msg});
        this.setState({text: ''})
    }

    render() {
        const user = this.props.match.params.user;
        const Item = List.Item;
        return (
            <div id="chat-page">{/*{/*thumb={}*/}
                <NavBar mode="dark">{user}</NavBar>
                {this.props.chat.chatMsg.map(v => {
                    return v.from === user?(
                        <List key={v._id}>
                            <Item >{v.content}</Item>
                        </List>
                    ):(
                    <List key={v._id}>
                        <Item className="chat-me" extra={'avater'}>wo发来的{v.content}</Item>
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
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                            // onExtraClick
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}
//编程式导航(withRouter用法)
export default  withRouter(connect(state => state, {getMsgList, sendMsg, recvMsg})(Chat))