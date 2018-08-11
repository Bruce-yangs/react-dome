import axios from 'axios'

const USER_LIST = 'USER_LIST'
//初始状态
const initState = {
    userList: [],
}

//reducer
export function chatuser(state = initState,action) {
    switch (action.type) {
        case USER_LIST:
            return {...state,userList:action.payload}
        default:
            return state
    }
}

export function userList(data) {
    return {type:USER_LIST,payload:data}
}

export function getUserList(type) {
    return dispatch=>{
        //获取用户信息
        axios.get('/user/list?type='+type)
            .then(res => {
                if (res.status == 200) {
                    //code 0:有登录信息 1:没有登录信息
                    if (res.data.code == 0) {
                        dispatch(userList(res.data.data))
                    }
                }
            })
    }
}