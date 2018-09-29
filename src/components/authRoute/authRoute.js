import {Component} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '@/user.redux'
class AuthRoute extends Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;

        if (publicList.includes(pathname)) {
            return null
        }
        //获取用户信息
        axios.get('/user/info')
            .then(res => {
                if (res.status == 200) {
                    //code 0:有登录信息 1:没有登录信息
                    if (res.data.code == 0) {
                        this.props.loadData(res.data.data)
                    } else {
                        this.props.history.push('/login')
                    }
                    // console.log(res.data)
                }
            })
    }

    render() {
        return null
    }
}
//编程式导航(withRouter用法)
export default withRouter(connect(null,{loadData})(AuthRoute))