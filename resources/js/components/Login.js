
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {


    constructor(props) {
        super(props);
        
        this.state = {

        }
    }

    componentDidMount() {
    }


    handleSubmit = e => {
        e.preventDefault();
        console.log("On Login");

        const data = {
            email: this.email,
            password: this.password
        }

        // console.log(data);

        axios.post('/api/login', data).then(
            res=> {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.user.id);
                this.setState({
                    loggedIn: true
                });
                this.props.setUser(res.data.user);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    render() {
        if(this.state.loggedIn) {
            return <Redirect to={'/'}/>; 
        }

        return ( 
            <div class="row">
                <form class="col offset-s4 s4" onSubmit={this.handleSubmit }>
                <div className="input-field col s12">
                    <h3>Login</h3>
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
                        <button class="waves-effect waves-light btn">Login</button>
                    </div>
    
    
                </form>
            </div>
         
          );
    }
}


export default Login;

