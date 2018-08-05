import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
// import {loadData} from '@/user.redux'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'

class NavLinkBar extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    constructor() {
        super();
        this.state = {}
    }
    render() {
        const navList= this.props.data.filter(v=>!v.hide)
        const {pathname}= this.props.location
        return (
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        title={v.text}
                        key={v.path}
                        icon={{uri:require(`img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`img/${v.icon}-active.png`)}}
                        selected={pathname === v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                    >

                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}
//编程式导航(withRouter用法)
export default withRouter(connect(null/*,{loadData}*/)(NavLinkBar))