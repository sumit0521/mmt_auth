import React, { Component } from "react";

export default class LoginUser extends Component {
  constructor(props){
    super(props)
  this.state = {email: "",
                password: ""
                }
  this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    console.log(event.target.name);
    this.setState({[event.target.name]: event.target.value});  
  }

  submitHandler(event) {
    console.log("submit button called");
    
    // this.setState({event.target.name: event.target.value});  
  }

    render() {
        return (
            <div>Login Successful</div>
        );
    }
}