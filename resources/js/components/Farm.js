import Axios from 'axios';
import { Button } from 'bootstrap';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Example extends Component {


    constructor(props) {
        super(props);
        
        this.state = {
            id:0,
            name:'',
            owner:'',
            unicorns:[],
            user_id:localStorage.getItem('user_id')
        }

        console.log("Current User", this.state.user_id);
    }

    componentDidMount() {
        this.getAll();
    }

    getAll() {
        Axios.get('/api')
        .then((res) => {
            console.log("GetAll: ", res.data.data);
            this.setState( {
                
                unicorns:res.data.data,
                id:0,
                name:'',
                owner:'',
            })
        }) 
    }

    getOne(unicorn) {

        this.setState( {
            id:unicorn.id,
            name:unicorn.name,
            owner:unicorn.owner
        })

    }

    delete(e, id) {
        Axios.delete(`/api/${id}`)
        .then((res) => {
            this.getAll();
        }) 
    }

    submit = (event, id) => {
        event.preventDefault();
        console.log("id", id, this.state.name);
        axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        if(id == 0) {
            Axios.post(`/api`, {name:this.state.name})
            .then((res) => {
                this.getAll();
            }) 
        }else {
            console.log("TEST: ", `http://localhost:8000/api/${id}`);
            Axios.put(`/api/${id}`, {name:this.state.name})
            .then((res) => {
                this.getAll();
            }) 
        }

    }
    
    nameChange(event) {
        this.setState({
            name:event.target.value
        })
    }



    render() {
    return (
        <div className = "container">
            <div className="row">
            <form onSubmit={(e)=>this.submit(e, this.state.id)}>

            {this.state.user_id? (
                <div className= "input-field col s4">
                    Add a new Unicorn to the farm

                    <input name = "name" onChange={(e)=>this.nameChange(e)} value={this.state.name}/>

                    <button type="submit" className="waves-effect waves-light btn">Save</button>
               
                </div>):
                (
                <div className= "input-field col s4">
                    <h4>Unicorns in the farm </h4>
                </div>)

            }
            </form>
                <table>
                    <tbody>
                        <tr >
                            <td><h5>Name</h5></td>
                            <td><h5>Owner</h5></td>
                            <td><h5>Update</h5></td>
                            <td><h5>Delete</h5></td>
                        </tr>

                        {
                            this.state.unicorns.map(unicorn=>
                            
                            
                            (<tr key={unicorn.id}>
                            <td>{unicorn.name}</td>
                                <td>{unicorn.owner? unicorn.owner.first_name + ", " + unicorn.owner.last_name: "N/A"}</td>
                                <td>
                                    <button disabled={unicorn.owner == null || unicorn.owner.id != this.state.user_id} onClick={(e)=>this.getOne(unicorn)} className="waves-effect waves-light btn">
                                    <i className="material-icons prefix">create</i>
                                    </button>
                                </td>
                                <td>
                                    <button disabled={unicorn.owner == null || unicorn.owner.id != this.state.user_id} onClick={(e)=>this.delete(e, unicorn.id)} className="waves-effect waves-light btn">
                                    <i className="material-icons prefix">delete</i>
                                    </button>
                                </td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
    }
}

export default Example;

