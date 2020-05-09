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

  indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  dataBase = null;
  userResult = null;
  validateUser = () => {
    this.dataBase = this.indexedDB.open("user", 1);
    
    this.dataBase.onupgradeneeded = () => {
      
  };

    this.dataBase.onerror = () => {
      console.error("Error", this.dataBase.error);
    };
    
    this.dataBase.onsuccess = (event) => {
      let transaction = event.target.result.transaction("registration", "readwrite");
      let registration = transaction.objectStore("registration");
      var getResult = registration.get(this.state.email);
      
      getResult.onsuccess = () => {
        this.userResult = getResult.result;
      }
      getResult.onerror = () => {
        console.log("Some Error Occurred");
      }
        
  }
    };



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
        if (this.userResult && this.userResult['password'] === this.state.password){
          this.setState({success: "Login Successful. Welcome " + this.userResult['name'], error:""});
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