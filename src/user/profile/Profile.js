import React, {Component} from 'react';
import { getUserProfile } from '../../util/APIUtils';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import { Avatar, Tabs } from 'antd';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';

const TabPane = Tabs.TabPane;

class Profile extends Component {
    _flag = false;
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading : false
        }
    }

    loadUserProfile = (username) => {
        this._flag = true;
        this.setState({
            isLoading : true
        });

        getUserProfile(username)
            .then(response => {
                if(this._flag) {
                    this.setState({
                        user :response,
                        isLoading : false
                    });
                }
            }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading : false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading : false
                });
            }
        });
    };

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        let usernmae = nextProps.match.params.username;
        if(this.props.match.params.username !== usernmae) {
            this.loadUserProfile(usernmae);
        }
    }

    componentWillUnmount() {
        this._flag = false;
    }



    render(){
        if(this.state.isLoading) {
            return <LoadingIndicator/>
        }
        if(this.state.notFound) {
            return <NotFound/>
        }
        if(this.state.serverError) {
            return <ServerError/>
        }

        const tabBarStyle = {
            textAlign : 'center'
        };

        return(
            <div className="profile">
                <h1>HOME</h1>
                {
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(this.state.user.joinedAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="user-poll-details">
                                <Tabs defaultActiveKey="1"
                                      animated={false}
                                      tabBarStyle={tabBarStyle}
                                      size="large"
                                      className="profile-tabs">
                                    <TabPane tab={`${this.state.user.pollCount} Polls`} key="1">
                                        <p>{this.props.match.params.username}</p>
                                        <p>{this.props.match.params.isAuthenticated}</p>

                                        {/*    <PollList username={this.props.match.params.username}
                                                  isAuthenticated = {this.props.isAuthenticated}
                                                  type="USER_CREATED_POLLS" />*/}
                                    </TabPane>
                                    {/*<TabPane tab={`${this.state.user.voteCount} Votes`}  key="2">
                                        <PollList username={this.props.match.params.username}
                                                  isAuthenticated = {this.props.isAuthenticated}
                                                  type="USER_VOTED_POLLS" />
                                    </TabPane>*/}
                                </Tabs>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Profile;