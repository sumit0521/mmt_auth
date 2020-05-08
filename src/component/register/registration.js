import React  from 'react';
import {} from "react-bootstrap";
import '../../index.css';
export default class SignUp extends React.Component {
  constructor(props){
    super(props)
  this.state = {email: "",
                password: "",
                name: "",
                gender: ""
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
    
    // this.setState({event.target.name: event.target.value});  
  }

  render() {
      return (
          <form onSubmit={this.submitHandler}>
              <h3>Sign Up</h3>

              <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="name" name="name" onChange={this.changeHandler}/>
              </div>

              <div className="form-group">
                  <label>Gender</label>
                  
  <select className="form-control" id="sel1" name="gender" onChange={this.changeHandler}>
    <option>MALE</option>
    <option>FEMALE</option>
    <option>OTHERS</option>
  </select>
              </div>

              <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.changeHandler}/>
              </div>

              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.changeHandler} />
              </div>

              <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          </form>
      );
  }
}
