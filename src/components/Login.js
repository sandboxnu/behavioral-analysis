import React, { Component } from 'react';
import Axios from 'axios';
import { func } from 'prop-types';
import { Form, Text } from 'informed';
import ServerUtils from '../ServerUtils';

const SERVER_URL = ServerUtils.getServerUrl();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badPassword: false,
      username: null,
      password: null,
    };
  }


  onPassword() {
    const { username, password } = this.state;
    console.log(username);
    Axios.post(`${SERVER_URL}/login`, {}, {
      auth: {
        username,
        password,
      },
    }).then(() => {
      this.props.onLogin(username, password);
    }).catch(() => {
      this.setState({ badPassword: true });
    });
    
  }


  render() {
    const { badPassword } = this.state;

    return (
      <div className="container" style={{marginTop: '35vh'}}>
        <Form
          onChange={(s) => { this.setState({ 
              password: s.values.inputPassword,
              username: s.values.inputUsername
            }); }}
          onSubmit={() => { this.onPassword(); }}>
          <div className="form-group">
            <label htmlFor="inputUsername">{"Username"}</label>
            <Text field="inputUsername" type="username" className="form-control" id="inputUsername" placeholder="Username" />
          </div>    
          <div className="form-group">
            <label htmlFor="inputPassword">{"Password"}</label>
            <Text field="inputPassword" type="password" className="form-control" id="inputPassword" placeholder="Password" />
          </div>
          {badPassword ? <div style={{color: "red", paddingBottom: 10, marginTop: -5}}>Incorrect Password!</div> : null}
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      </div>
    );
  }
}



export default Login;