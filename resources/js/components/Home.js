import React, { Component } from 'react';
import Farm from './Farm';

class Home extends Component {


    constructor(props) {
        super(props);

        
        this.state = {
        }
    }

    render() {

        if(this.props.user){
            return (
                <div>
                    <div className= "input-field col s4">
                        <h5 className="left-align">Hi {this.props.user.first_name} {this.props.user.last_name}</h5>
                    </div>
                    <Farm></Farm>
                </div>

            )
        }
        return ( 
                <div>
                    <div className= "input-field col s4">
                        <h5 className="left-align">You are not logged in</h5>
                    </div>
                    <Farm></Farm>
                </div>

        
        );
    }
}


export default Home;

