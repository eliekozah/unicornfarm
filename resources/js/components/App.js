import Axios from 'axios';
import { Button } from 'bootstrap';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch , Route} from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';

class App extends Component {


    constructor(props) {
        super(props);
        
        this.state = {
        }
    }

    componentDidMount = () => {


        axios.get('/api/user' ).then(
            res=> {
                console.log("Logged In ?", res);
                this.setUser(res.data);
            },

            err => {
                console.log(err)
            }
        )
    }

    setUser = user => {
        this.setState({
            user:user
        });
    }


    render() {
    return ( 
        <BrowserRouter>
            <div className="App">
                <Nav user={this.state.user} setUser={this.setUser}></Nav>

                <Switch>
                    <Route exact path="/" component={() => <Home user={this.state.user} />}></Route>
                    <Route exact path="/login" component={() => <Login setUser={this.setUser}/>}></Route>
                    <Route exact path="/signup" component={Signup}></Route>
                </Switch>
            </div>
        </BrowserRouter>
      );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default App;

