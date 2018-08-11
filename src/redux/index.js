/**
 * Created by Administrator on 2018/7/8.
 * @author yangkun
 */
import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';//专门连接用
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link, NavLink
} from 'react-router-dom'

/*此处的a是公共要改变的数据*/
/*const store = createStore(a,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))*/

function One() {
    return <h1>1队</h1>
}
function Two() {
    return <h1>2队</h1>
}
function Three() {
    return <h1>3队</h1>
}
function NotFound() {
    return <h1>404</h1>
}

/*Provider专门连接用 在最外层*/
 ReactDom.render(
     (<Provider store={store}>
         <Router>
             <div>
                 <ul>
                     <li><Link to="/">1队</Link></li>
                     <li><Link to="/two">2队</Link></li>
                     <li><Link to="/three">3队</Link></li>
                 </ul>
                 <Switch>
                     <Route path="/" exact component={One}></Route>
                     <Route path="/two"  component={Two}></Route>
                     <Route path="/three"  component={Three}></Route>
                     <Route path="/:location"  component={NotFound}></Route>
                 </Switch>
             </div>
         </Router>
         <App></App>
     </Provider>),
     document.getElementById('root')
 )




const ADD_GUN = 1;
const REMOVE_GUN = 2;

//新建 store
//通过reducer简历 根据老的state和action生成新的state
export function counter(state = 0, action) {
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return 10
    }
}

export function addGun() {
    return {type: ADD_GUN}
}


export function removeGun() {
    return {type: REMOVE_GUN}
}

