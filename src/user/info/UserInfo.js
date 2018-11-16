import React, {Component} from 'react';
import { Button } from 'antd';

class UserInfo extends Component {
    render(){
        return(
            <div>
                <p>
                    UserInfo
                    <br/>
                    authentication : {this.props.authentication} <br/>
                    path : {this.props.path}
                </p>
                <Button onClick={() => this.props.handleLogout("/")}>
                    로그아웃
                </Button>
            </div>
        );
    }
}

export default UserInfo;