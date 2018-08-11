import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
//聊天列表
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RECV = 'MSG_RECV';
//标识已读
const MSG_READ = 'MSG_READ';
//初始状态
const initState = {
    chatMsg: [],
    unread: 0,
}
//reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatMsg: action.payload, unread: action.payload.filter(v => !v.read).length}
        case MSG_RECV:
            return {
                ...state,
                chatMsg: [...state.chatMsg, action.payload],unread:state.unread+1/*,unread:action.payload.filter(v=>!v.read).length*/
            }
        /*   case MSG_READ:
         return {...state, chatMsg: action.payload}*/
        default:
            return state
    }
}


export function msgList(data) {
    return {type: MSG_LIST, payload: data}
}
export function msgRecv(data) {
    return {type: MSG_RECV, payload: data}
}

//监听 服务端返回值
export function recvMsg() {
    return dispatch => {
        socket.on('recvMsg', function (data) {
            console.log('recvMsg', data)
            dispatch(msgRecv(data))
        })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendMsg', {from, to, msg})
    }
}
export function getMsgList(type) {
    return dispatch => {
        //获取用户信息
        axios.get('/user/getMsgList')/*?type=' + type*/
            .then(res => {
                console.log(res.status)
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(msgList(res.data.msgs))
                }
            })
    }
}