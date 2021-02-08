import axios from 'axios';
import Axios from 'axios';
import { Button } from 'bootstrap';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

class Signup extends Component {


    constructor(props) {
        super(props);
        
        this.state = {
            registered:false
        }
    }

    componentDidMount() {
    }


    handleSubmit = e => {
        e.preventDefault();
        console.log("On Submit");

        const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirm: this.confirmPassword
        }

        console.log(data);

        axios.post('/api/register', data).then(
            res=> {
                console.log(res)
                this.setState({registered: true});
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    render() {
        if(this.state.registered) {
            return <Redirect to={'/login'}/>; 
        }
    return ( 
        <div class="row">
            <form class="col offset-s4 s4" onSubmit={this.handleSubmit }>
                
                <h3 className="input-field col s12">Sign Up</h3>

                <div className="input-field col s12">
                    <input type="text" className="validate" placeholder="First Name" id="first_name"
                    onChange={e => this.firstName = e.target.value}></input>
                    <label for="first_name">First Name</label>
                </div>

                <div className="input-field col s12">
                    <input type="text" className="validate" placeholder="Last Name" id="last_name"
                    onChange={e => this.lastName = e.target.value}></input>
                    <label for="last_name">Last Name</label>
                </div>

                <div className="input-field col s12">
                    <input type="email" className="validate" placeholder="Email" id="email"
                    onChange={e => this.email = e.target.value}></input>
                    <label for="email">Email</label>
                </div>

                <div className="input-field col s12">
                    <input type="password" className="validate" placeholder="Password" id="pass"
                    onChange={e => this.password = e.target.value}></input>
                    <label for="pass">Password</label>
                </div>

                <div className="input-field col s12">
                    <input type="password" className="validate" placeholder="Confirm Password" id="c_pass"
                    onChange={e => this.confirmPassword = e.target.value}></input>
                    <label for="c_pass">Confirm Password</label>
                </div>

                <div className="input-field col s12">
                    <button class="waves-effect waves-light btn">Register</button>
                </div>


            </form>
        </div>
     
      );
    }
}


export default Signup;

