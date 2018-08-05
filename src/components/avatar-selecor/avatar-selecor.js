import React, {Component} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '@/user.redux'
import PropTypes from 'prop-types'
import {List,Grid} from 'antd-mobile'

class AvatarSelecor extends Component {
    static propTypes = { //isRequired
        selectAvatar: PropTypes.func
    }

    constructor() {
        super();
        this.state = {}
    }

    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,woman,zebra'
            .split(',')
            .map(v => ({
                icon: require(`img/${v}.png`),
                text: v
            }));
        const gridHeader = this.state.text ? (<div>
            <span>已选头像</span>
            <img src={this.state.icon} style={{width: 20}}/>
        </div>) : <div>请选择头像</div>;
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    {/*<div>头像选择</div>*/}
                    <Grid data={avatarList} columnNum={5}
                          onClick={elm => {
                              this.setState(elm)
                              this.props.selectAvatar(elm.text)
                          }}
                    />
                </List>
            </div>
        )
    }
}
//编程式导航(withRouter用法)
export default withRouter(connect(null, {loadData})(AvatarSelecor))