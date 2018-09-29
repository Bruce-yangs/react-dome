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
    users: {}
}
//reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                users: action.payload.users,
                chatMsg: action.payload.data,
                unread: action.payload.data.filter(v => !v.read && v.to === action.payload.userId).length
            }
        case MSG_RECV:
            const n = action.payload.to == action.userId ? 1 : 0;
            console.log(action.payload)
            console.log(action.userId)
            return {
                ...state,
                chatMsg: [...state.chatMsg, action.payload],
                unread: state.unread + n/*,unread:action.payload.filter(v=>!v.read).length*/
            }
           case MSG_READ:
               const {from,num} = action.payload;
         return {...state, chatMsg: state.chatMsg.map(v=>({...v,read:from===v.from?true:v.read})),unread:state.unread - num}
        default:
            return state
    }
}


 function msgList(data, users, userId) {
    return {type: MSG_LIST, payload: {data, users, userId}}
}
 function msgRecv(data, userId) {
    return {userId, type: MSG_RECV, payload: data}
}
//num 是改变了几个阅读状态
 function msgRead({from,userId,num}) {
    return { type: MSG_READ, payload: {from,userId,num}}
}


//是否已读
export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {from})
            .then(res => {
                const userId = getState().user._id;
                if (res.status == 200 && res.data.code == 0) {
                    let num = res.data.num;
                    dispatch(msgRead({from,userId,num}))
                }

            })
    }
}

//监听 服务端返回值
export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvMsg', function (data) {
            const userId = getState().user._id;

            dispatch(msgRecv(data, userId))
        })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendMsg', {from, to, msg})
    }
}
export function getMsgList(type) {
    return (dispatch, getState) => {
        //获取用户信息
        axios.get('/user/getMsgList')
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    const userId = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users, userId))
                }
            })
    }
}