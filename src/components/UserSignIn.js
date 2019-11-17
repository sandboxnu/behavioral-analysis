import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Launch from './Launch';
import styled from 'styled-components';

const SignInScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignInTitle = styled.div`
  margin-bottom: 0.25em;
  font-size: 4em;
  color: #f7b733;
`
const SignInSubtitle = styled.div`
  margin-bottom: 1.5em;
  font-size: 1em;
  margin: auto; 
  width: 30em;
  margin-bottom: 2em;
  color: #393e47;
`
const SignInContainer = styled.div`
  margin: auto;
  text-align: center;
`
const UserPrompt = styled.div`
  color: red;
`
const SubmitButton = styled.input`
  background-color: #f7b733;
  color: white;
  padding: .5em;
  margin: .5em;
  border-radius: .5em;
  border: none;
`


class UserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      isIDEmpty: false
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
    if (this.state.userId.length > 0) {
      ReactDOM.render(<Launch />, document.getElementById('root'));   
    } else {
      this.setState({isIDEmpty: true});
    }
    e.preventDefault();
  }
  

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name='userId' type='text' placeholder='Your ID' value={this.state.userId} onChange={this.handleFormChange}/>
        <br/>
        <SubmitButton type='submit' value='Submit' />
        {this.state.isIDEmpty ? <UserPrompt>No ID entered. Please enter your ID.</UserPrompt> : <span></span>}
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
      <SignInScreen>
        <SignInContainer>
          <SignInTitle> Behavioral Analysis</SignInTitle>
          <SignInSubtitle>Enter your assigned ID.</SignInSubtitle>
          <UserInfoForm />
        </SignInContainer>
      </SignInScreen>
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