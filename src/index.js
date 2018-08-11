import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    Link, NavLink
} from 'react-router-dom'

import reducers from './reducer';
import './config';
import Login from 'con/login/login';
import Register from 'con/register/register';
import BossInfo from 'con/bossInfo/bossInfo';
import Geniusinfo from 'con/geniusinfo/geniusinfo';
import AuthRoute from 'com/authRoute/authRoute';
import Dashboard from 'com/dashboard/dashboard';
import Chat from 'com/chat/chat';
import 'css/index.css'

import {Button, List} from 'antd-mobile';


/*此处的reducers是公共要改变的数据*/
const store = createStore(reducers, compose(
    applyMiddleware(thunk),//thunk中间件
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

/*basename的作用是个我们增加一级导航目录  移动端一般用#哈希模式 HashRouter*/
//boss genius me msg 这4个页面有相同的结构

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter >{/*basename="demo"*/}
            <div>
                <AuthRoute></AuthRoute>
                <Switch>{/*Switch 只要子组件命中一个 其他组件就不管了*/}
                    <Route path="/login" component={Login}></Route>{/*exact*/}
                    <Route path="/register" component={Register}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={Geniusinfo}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);


