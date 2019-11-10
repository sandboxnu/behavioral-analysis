import React, { Component } from 'react';
import '../css/SignInScreen.css';

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "Your ID",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    console.log(this.state.userId)
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="userId" type="text" value={this.state.userId} onChange={this.handleFormChange}/>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class UserSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
    };
  }

  renderSignInScreen() {
    return (
      <div className="signInScreen">
        <div className="signInContainer">
          <div className="signInTitle"> Behavioral Analysis</div>
          <div className="signInSubtitle">Enter your assigned ID.</div>
          <UserInfoForm />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSignInScreen()}
      </div>
    )
  }

}


export default UserSignIn;
