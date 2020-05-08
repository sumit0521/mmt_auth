import React, { Component } from "react";
import '../../index.css';
import axios from "axios";

export default class Login extends Component {
  constructor(props){
    super(props)
  this.state = {email: "",
                password: ""
                }
  this.changeHandler = this.changeHandler.bind(this);
  this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    console.log(event.target.name);
    this.setState({[event.target.name]: event.target.value});  
  }

  submitHandler(event) {
    console.log("submit button called");
    var formData = new FormData();
    formData.append("email",this.state.email);
    formData.append("password", this.state.password);
    axios.post('http://localhost:8080/apis/login', formData).then(res => {
      console.log(res);
      console.log(res);
      this.props.history.push('/loginuser');
    })
      .catch(response => {
          //handle error
          console.log(response);
          this.props.history.push('/loginuser');
      });
    // this.props.history.push('/loginuser');
    // this.setState({event.target.name: event.target.value});  
  }

    render() {
        return (
            <form onSubmit={this.submitHandler} >
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.changeHandler}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.changeHandler}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}