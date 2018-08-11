import axios from 'axios'
import {getRedirectPath} from 'js/util'
//const REGISTER_SUCCESS = 'REGISTER_SUCCESS';//注册成功
const ERROR_MSG = 'ERROR_MSG';//错误信息
//const LOGIN_SUCCESS = 'LOGIN_SUCCESS';//登录成功
const AUTH_SUCCESS = 'AUTH_SUCCESS';//验证条件是否成功
const LOAD_DATA = 'LOAD_DATA';//
const LOGOUT = 'LOGOUT';//退出
//初始状态
const initState = {
    redirectTo: '',
    // isAuth: false,
    user: '',
    type: '',
    msg: ''
}

//reducer 跳转写在 reducer
export function user(state = initState, action) {
    switch (action.type) {//REGISTER_SUCCESS
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...initState, redirectTo:'/login'}
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false}
        default:
            return state
    }
    return state
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

//公用传值
function authSuccess(obj) {
    const {pwd,...data} = obj;
    return {payload: data, type: AUTH_SUCCESS}
}

// function loginSuccess(data) {
//     return {payload: data, type: AUTH_SUCCESS}
// }

export function loadData(userInfo) {
    //获取用户信息
    return {payload: userInfo, type: LOAD_DATA}

}
//退出登录
export function logoutSubmit(userInfo) {
    //获取用户信息
    return {payload: userInfo, type: LOGOUT}

}
//注册
export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    if (repeatpwd !== pwd) {
        return errorMsg('两次密码不一样，请重新输入')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {//此处注意 派发出去
                    dispatch(authSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}
//登录
export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入');
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}


export function update(data) {
    return dispatch=> {
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status === 200 && res.data.code === 0) {//此处注意 派发出去
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
