import React, {Component} from 'react';
import {WhiteSpace, WingBlank,  Card} from 'antd-mobile'
import PropTypes from 'prop-types'

class UserCard extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const Header=Card.Header
        const Body=Card.Body;
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userList.map(v=>(
                v.avatar?(<Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={require(`img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        ></Header>
                    <Body>
                    {v.type===2?<div>公司：{v.company}</div>:null}
                    {v.desc.split('\n').map(d=>(
                        <p key={d}>{d}</p>
                    ))}
                    {v.type===2?<div>薪资：{v.money}</div>:null}
                    </Body>

                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}
export default UserCard