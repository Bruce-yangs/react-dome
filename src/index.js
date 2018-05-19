import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Preson from './components/Preson/Preson';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter,
    Switch,
    Route,
    Link ,NavLink} from 'react-router-dom'

    /*点击更换显示文案*/
    class Text extends React.Component {
        constructor(){
            super();
            this.state = {
                msg:'well',
                show:false,
                arr:  [{id:1,name: "ww", age: 221}, {id:2,name: "zz", age: 25}, {id:3,name: "tt", age: 2}, {id:4,name: "gg", age: 12}, {id:5,name: "ss", age: 33}]
            }
        }
        handle() {
            this.setState({
                msg:this.state.msg ==='well'?'nice':'well'
            })
        }
        //双向绑定，自己修改input值 父级同时更改
        changeName(event,id) {
            let persons = [...this.state.arr];
            const PERSONINDEX = persons.findIndex(item =>{
                    return item.id === id;
                });
            persons[PERSONINDEX].name = event.target.value;
            this.setState({
                arr: persons
            })
        }
        show() {
            this.setState({
                show: !this.state.show
            })
        }
        //删除对应的 数据
        delete(index) {
            let data = [...this.state.arr];
            data.splice(index,1);
            this.setState({
                arr: data
            })
        }
        render() {
            //渲染 数据
            let persons = null;
            if(this.state.show) {
                persons = (
                      <div>
                        {/* <Preson  msg={this.state.msg} changed={this.changeName.bind(this)}></Preson>
                          <Preson  msg='哈哈哈' changed={this.changeName.bind(this)}>知道现在努力还不晚</Preson>*/}
                          {
                              this.state.arr.map((item,index) => {
                                  return <Preson  msg={item.name}
                                                  key={item.id}
                                                  myclick={() => this.delete(index)}
                                                  changed={(event) =>this.changeName(event,item.id)} />
                              })
                          }
                      </div>

                )
            }
            //此处是动态修改样式
            let classes = [];   //['red','bold'].join(' ') size
            let len = this.state.arr.length;
            if(len === 1) {
                classes.push('red');
            }else if(len === 2) {
                classes.push('size');
            }else if(len === 3) {
                classes.push('bold');
            }else if(len === 4) {
                classes.push('bg');
                classes.push('br');
            }
            return (
                <div>
                    <p className={classes.join(' ')}>Hello World</p>
                    <button onClick={this.show.bind(this)}>Button show</button>
                    {persons}
                    <button onClick={this.handle.bind(this)}>changeText</button>
                    <div className="box">{this.state.msg}</div>
                    <Clock />
                    <ShowBox />
                    <SyncInput />
                    <MyCom />
                    <Drap />
                    <Form />
                    <Parent />
                    <Parents />
                    <MapList />
                    {/*<h3>{this.props.a+ ' '+this.props.b}</h3>*/}
                </div>
            )
        }
    }

    /* 时间戳修改*/
    class Clock extends React.Component {
        constructor() {
            super();
            this.state = {
                time: Date.now()
            };
            this.timer = null;
        }
        /*组件渲染后*/
        componentDidMount() {
            this.changeTime();
        }
        /*组件销毁 清除定时器*/
        componentWillUnmount() {
            clearInterval(this.timer)
        }
        changeTime() {
            this.timer = setInterval(() => {
                this.setState({
                    time: Date.now()
                })
            },1000)
        }
        render() {
            return (
                <h3>{this.state.time}</h3>
            )
        }

    }

    /*点击盒子 显示隐藏    this.state 和 this.setState 配合使用 */
    class ShowBox extends React.Component{
        constructor() {
            super();
            this.state = {
                msg:'显示'
            }
        }
        handleClick() {
            this.setState({
                msg: this.state.msg ==='显示' ? '隐藏' :'显示'
            })
        }
        render() {
            return (
                <div>
                    <button onClick={this.handleClick.bind(this)}>点击效果</button>
                    <div className="box-showHide" style={{display:this.state.msg ==='显示' ? 'block' :'none'}}>
                        {this.state.msg}
                    </div>
                </div>

            )
        }
    }

    /*input 同步输入内容*/
    class SyncInput extends React.Component{
        constructor() {
            super();
            this.state = {
                text:''
            }
        }
        change(e) {
            let v = this.refs.inputV;
            this.setState({
                text : v.value
            }) ;
           /* this.setState({
                text : e.target.value
            });*/
            console.log(v.value)
        }
        render() {
            return(
                <div>
                    <input ref="inputV" type="text" onChange={this.change.bind(this)}/>
                    <h3>{this.state.text}</h3>
                </div>
            )
        }
    }

    /*拖拽 效果*/
    class Drap extends React.Component{
        constructor() {
            super();
            this.state = {
                left: 333,
                top:222
            }
            this.x = 0;
            this.y = 0;
        }
        down(e) {
            this.dis = e.target;
            this.x = e.clientX - this.dis.offsetLeft;
            this.y = e.clientY - this.dis.offsetTop;

            document.onmousemove = this.fnMove.bind(this);
            document.onmouseup = this.fnUp.bind(this);
        }
        fnMove(e) {
            let X = e.clientX - this.x;
            let Y = e.clientY - this.y;
            this.setState({
                left: X,
                top: Y
            }) ;
        }
        fnUp() {
            document.onmousemove = null;
            document.onmouseup = null;
        }
        render() {
            return(
                <div className="box-drap" style={{left:this.state.left,top:this.state.top}} onMouseDown={this.down.bind(this)}>可以拖拽</div>
            )
        }

    }

    /*生命周期*/
    class MyCom extends React.Component{
        constructor() {
            super();
            this.state = {
                msg: '哈哈'
            }
        }
        /*此时页面dom 还没有渲染出来*/
        componentWillMount() {
            console.log('组件挂载前')
        }
        /*此时页面dom 已经渲染出来*/
        componentDidMount() {
            console.log(this.refs.div)
            console.log('组件挂载后')
        }
        /*组件更新前*/
        componentWillUpdate() {
            console.log('组件更新前')
           /* if(this.state.msg === '哈哈') {
            }*/
        }
        /*组件更新后*/
        componentDidUpdate() {
            console.log('组件更新后')
        }
        /*组件卸载*/
        componentWillUnmount() {
            console.log('组件卸载')
        }
        handleClick(e) {
            this.setState({
                msg: this.state.msg ==='哈哈' ? '嘿嘿' : '哈哈'
            })
            // 阻止原生事件与最外层document上的事件间的冒泡
            e.nativeEvent.stopImmediatePropagation();
        }
       render() {
           return (
               <div ref="div" onClick={this.handleClick.bind(this)}>{this.state.msg}</div>
           )
       }
    }

    /*表单*/
    class Form extends React.Component{
        constructor() {
            super();
        }
        render() {
            /*表单默认值书写 defaultValue="aaa"  defaultChecked*/
            return(
                <div>
                    <input type="text" placeholder="hahaha"/>
                    <input type="checkbox" defaultChecked/>

                </div>
            )
        }
    }

    /*父子通信--父传子*/
    class Parent extends React.Component{
        constructor() {
            super();
            this.state = {
                msg:'我是爸爸'
            }
        }
        changeMsg() {
            this.setState({
                msg: this.state.msg.split('').reverse().join('')
            })
        }
        render() {
            return(
                <div>
                    <div>---------------父传子--------------</div>
                    <p onClick={this.changeMsg.bind(this)}>我是父级--->{this.state.msg}</p>
                    <Child m={this.state.msg}/>
                </div>
            )
        }
    }

    class Child extends React.Component{
        constructor() {
            super();
        }
        render() {
            return(
                <div>
                    <p>我是子级--->{this.props.m}</p>
                </div>
            )
        }
    }

    /*父子通信--子传父*/
    class Parents extends React.Component{
        constructor() {
            super();
            this.state = {
                msg :''
            }
        }
        getMsg(data) {
            this.setState({
                msg: data
            })
        }
        render() {
            return(
                <div>
                    <div>---------------以下子传父--------------</div>
                    <p >我是父级--->{this.state.msg || '暂无数据'}</p>
                    <Childs fnTrans={this.getMsg.bind(this)}/>
                </div>
            )
        }
    }

    class Childs extends React.Component{
        constructor() {
            super();
            this.state = {
                msg: 'this is form to child '
            }
        }
        componentDidMount() {
            this.props.fnTrans(this.state.msg);
        }
        handleClick() {
            let str = this.state.msg.split('').reverse().join('');
            this.setState({
                msg: str
            });
            this.props.fnTrans(str);
        }
        render() {
            return(
                <div>
                    <p onClick={this.handleClick.bind(this)}>我是子级--->{this.state.msg}</p>
                </div>
            )
        }
    }

    /*遍历数组*/
    class MapList extends React.Component{
        constructor() {
            super();
            this.state = {
                // data: ['哈哈','呵呵','嘿嘿']
                data: [{name:'哈哈'},{name:'呵呵'},{name:'嘿嘿'}]
            }
        }
        componentWillMount() {
            this.fetchData();
        }
        fetchData() {
            let ajax = new XMLHttpRequest();
            ajax.open('GET','https://bird.ioliu.cn/joke/rand?type=text',true);
            ajax.send();
            ajax.onload = function () {
                if(ajax.status === 200) {
                    let json = JSON.parse(ajax.responseText)
                    if(json.status.code !== -1) {
                        this.setState({
                            data: json.data
                        })
                    }else {
                        alert(json.status.message)
                    }
                    console.log(typeof json)
                    console.log(json.data)
                }
            }.bind(this)
        }
        render() {
            return(
                <div>
                    <p style={{display:this.state.data.length>0?'none':'block'}}>Loading...</p>
                    <ul>
                        {
                            this.state.data.map((item,index) => {
                                return  <li key={index}>{index+1}--{item.content}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }

    }

    /*router路由*/
    class App extends Component{
        constructor() {
            super();
        }
        render() {
            return(
                <div>
                    <h1>Welcome to react-router 练习</h1>
                    <ul className="bg">{/*activeStyle={{color: 'red'}}*/}
                        <li><NavLink to='/' exact activeClassName="active">Home</NavLink></li>
                        <li><NavLink to='/Parents' >MapList</NavLink> </li>
                        <li><NavLink to='/SyncInput' >SyncInput</NavLink></li>
                        <li><NavLink to='/roster' >Roster</NavLink></li>
                    </ul>
                    {/*此区域是 当点击选项卡切换内容  component={SyncInput} */ }
                    <div>
                        <Switch>
                            {/*Route 中添加一个 exact 的 prop，来确保只有完全匹配的时候才会渲染*/}
                            <Route exact path='/' component={Clock}/>
                            <Route path='/Parents' component={Parents}/>
                            <Route path='/SyncInput' component={SyncInput}/>
                            <Route path='/roster' component={Roster}/>
                        </Switch>
                    </div>
                </div>
            )
        }
    }

    const PlayerAPI = {
        players: [
            { number: 1, name: "Ben Blocker", position: "G" },
            { number: 2, name: "Dave Defender", position: "D" },
            { number: 3, name: "Sam Sweeper", position: "D" },
            { number: 4, name: "Matt Midfielder", position: "M" },
            { number: 5, name: "William Winger", position: "M" },
            { number: 6, name: "Fillipe Forward", position: "F" }
        ],
        all: function() { return this.players},
        get: function(id) {
            const isPlayer = p => p.number === id
            console.log(this.players.find(isPlayer))
            return this.players.find(isPlayer)
        }
    }
    const FullRoster = () => (
        <div>
            <ul>
                {
                    PlayerAPI.all().map(p => (
                        <li key={p.number}>
                            <Link to={`/roster/${p.number}`}>{p.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
    const Player = (props) => {
        const player = PlayerAPI.get(
            parseInt(props.match.params.number, 10)
        )
        if (!player) {
            return <div>Sorry, but the player was not found</div>
        }
        return (
            <div>
                <h1>{player.name} (#{player.number})</h1>
                <h2>Position: {player.position}</h2>
                <Link to='/roster'>Back</Link>
            </div>
        )
    }

    const Roster = () => (
        <Switch>
            <Route exact path='/roster' component={FullRoster}/>
            <Route path='/roster/:number' component={Player}/>
        </Switch>
    )


    ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>
        , document.getElementById('root'));
    registerServiceWorker();

    //此处是所有练习 组件都在Text中
/*ReactDOM.render(
        <Text />
    , document.getElementById('root'));
registerServiceWorker();*/
