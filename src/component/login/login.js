import React, { Component } from "react";
import '../../index.css';

export default class Login extends Component {
  constructor(props){
    super(props)
  this.state = {email: "",
                password: "",
                error: "",
                success: ""
                }
  this.changeHandler = this.changeHandler.bind(this);
  this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    console.log(event.target.name);
    this.setState({[event.target.name]: event.target.value});  
  }

  validateForm(){
    if (this.state['email'] === '' || this.state['password'] === ''){
      console.log("Please Provide Proper Input");
      return false;
    }
    return true;
  }

  submitHandler(event) {
    event.preventDefault();
    if (this.validateForm()){
        console.log("submit button called");
        var userObject = window.localStorage.getItem(this.state['email']);
        if (userObject && JSON.parse(userObject)['password'] === this.state.password){
          var userObjectJson = JSON.parse(userObject);
          this.setState({success: "Login Successful. Welcome " + userObjectJson['name'], error:""});
        }else{
          this.setState({error: "Please Provide Correct Input", success: ""});
  }
        }
else{
    this.setState({error: "Please Fill All Fields", success: ""});
  }
      
  }

    render() {
      let text;
        if (this.state.error){
          text = <div style={{color:"red", text:"center"}}><p>{this.state.error}</p></div>;
        }
        else{
        text = <div style={{color:"green", text:"center"}}> {this.state.success}</div>
        }
        return (
          <div>
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
            {text}
            </div> 
        );
    }
}