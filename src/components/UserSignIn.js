import React, {Component} from 'react';
import '../css/LaunchScreen.css';

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "John Appleseed",
      dob: "01/05/1999"
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
    console.log(this.state.name + this.state.dob)
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Name: <input name="name" type="text" value={this.state.name} onChange={this.handleFormChange}/>
        </label>
        <br/>
        <label> Date of Birth mm/dd/yyyy: <input name="dob" type="text" value={this.state.dob} onChange={this.handleFormChange}/>
        </label>
        <br/>
        <input type="submit" value="Submit"/>
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

  renderLaunchScreen() {
    return (
      <div class="launchContainer">
        <div class="launchTitle"> Behavioral Analysis</div>
        <div class="launchSubtitle">[Insert Subtitle]</div>
        <UserInfoForm/>
      </div>
    );
  }

  render() {
    return(
      <div>
        {this.renderLaunchScreen()}
      </div>
    )
  }

}


export default UserSignIn;
