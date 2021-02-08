import Axios from 'axios';
import { Button } from 'bootstrap';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Nav extends Component {


    constructor(props) {
        super(props);
        
        this.state = {
        }
    }

    componentDidMount() {
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    };


    render() {
        let buttons;
        if(this.props.user){
            buttons = (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/">Home</a></li>
                <li><a href="/" onClick={()=> localStorage.clear()}>Logout</a></li>
            </ul>)
        }else {
            buttons = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Signup</a></li>
                </ul>)
        }
    return ( 
        <nav>
            <div className="nav-wrapper">
            <a href="#" className="brand-logo">The Unicorn Farm</a>
            {buttons}

            </div>
        </nav>
     
      );
    }
}


export default Nav;

