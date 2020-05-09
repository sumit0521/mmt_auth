import React  from 'react';
import {} from "react-bootstrap";
import '../../index.css';

export default class SignUp extends React.Component {
  constructor(props){
    super(props)
  
    this.state = {email: "",
                password: "",
                name: "",
                gender: "MALE",
                error: "",
                success: ""
                }
  // this.state = this.initialState;
  this.changeHandler = this.changeHandler.bind(this);
  this.submitHandler = this.submitHandler.bind(this);
  }
  indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  dataBase = null;

  startDB = () => {
    this.dataBase = this.indexedDB.open("user", 1);
    
    this.dataBase.onupgradeneeded = (event) => {
      let db = event.target.result;
      // continue to work with database using db object
      if (!db.objectStoreNames.contains('registration')) { 
        db.createObjectStore('registration', {keyPath: 'email'});
    }
  };

    this.dataBase.onerror = () => {
      console.error("Error", this.dataBase.error);
    };
    
    this.dataBase.onsuccess = (event) => {
      let transaction = event.target.result.transaction("registration", "readwrite");
      let registration = transaction.objectStore("registration");
      console.log(registration.get(this.state.email));
      var getResult = registration.get(this.state.email);
      
      getResult.onsuccess = () => {
        if(getResult.result){
        this.setState({success: "", error:"User Already Exists"});
        }else{
          let request = registration.add(this.state);
          request.onsuccess = () => {
            console.log("IndexedDb Storage Complete");
            this.setState({success: "User Successfully Created", error: ""})    
          }
          request.onerror = () => {
            this.setState({error: "Some Error Occured", success: ""})
          }
        }
      }
      getResult.onerror = () => {
        this.setState({error: "Some Error Occured", success: ""})
      }
        
  }
    };

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
      this.startDB();
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
