import React  from 'react';
import {} from "react-bootstrap";
import '../../index.css';
import axios from 'axios';

export default class SignUp extends React.Component {
  constructor(props){
    super(props)
  
    this.state = {email: "",
                password: "",
                name: "",
                gender: "MALE",
                error: "",
                success: "",
                resp: ""
                }
  // this.state = this.initialState;
  this.changeHandler = this.changeHandler.bind(this);
  this.submitHandler = this.submitHandler.bind(this);
  }

  createUser = () => {
    var jsonBody = {'email': this.state.email,
                'name': this.state.name,
                'password': this.state.password,
                'gender': this.state.gender}
    axios.post("http://localhost:8080/apis/register", jsonBody)
    .then(response => {
      console.log("fdsfds", response);
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
    if (this.state.email === '' || this.state.password === '' || 
    this.state.gender === '' || this.state.name=== ''){
      console.log("Please Provide Proper Input");
      return false;
    }
    return true;
  }
  submitHandler(event) {
    event.preventDefault();
    if (this.validateForm()){ 
      this.createUser();
      if (this.state.resp && this.state.resp.success){
        this.setState({success: this.state.resp.message, error: "", resp: ""})
      }
      else if(this.state.resp && !this.state.resp.success){
        this.setState({success: "", error: this.state.resp.message, resp:""})
      }
      else{
        this.setState({success: "", error: "Please provide proper input", resp:""})
      }
    }
else{
    this.setState({error: "Please provide Correct Input", success: ""})
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
          <form onSubmit={this.submitHandler}>
              <h3>Sign Up</h3>

              <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="name" name="name" onChange={this.changeHandler}/>
              </div>

              <div className="form-group">
                  <label>Gender</label>
                  
  <select className="form-control" id="sel1" name="gender" onChange={this.changeHandler}>
    <option value="MALE">MALE</option>
    <option value="FEMALE">FEMALE</option>
    <option value="OTHERS">OTHERS</option>
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
          {text}
          </div>
      );
  }
}
