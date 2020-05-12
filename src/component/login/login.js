import React, { Component } from "react";
import '../../index.css';
import axios from 'axios';

export default class Login extends Component {
  constructor(props){
    super(props)
  this.state = {email: "",
                password: "",
                error: "",
                success: "",
                resp: ""
                }
  this.changeHandler = this.changeHandler.bind(this);
  this.submitHandler = this.submitHandler.bind(this);
  }

  

  validateUser = () => {
    console.log("inside validateUser", this.state);
    axios.post("http://localhost:8080/apis/login", this.state)
    .then(response => {
      this.setState({resp: response.data})
    })
            .catch( response => {
              console.log(response)
            })
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
        this.validateUser();
        if (this.state.resp && this.state.resp.success){
           this.setState({success: "Login Successful. Welcome " + this.state.resp.data.name,
           resp: "",
            error:""});
         }
        else{
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