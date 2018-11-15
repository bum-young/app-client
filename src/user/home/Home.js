import React, {Component} from 'react';


class Home extends Component {

    componentDidMount(){
        console.log("=]   Home");
    }

    render(){

        return(
            <div className="profile">
                Home
            </div>
        );
    }
}

export default Home;