import React, { Component } from 'react';
import Form from 'react-jsonschema-form-bs4';
import Fetch from 'react-fetch-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import schema from '../ConfigValuesSchema';
import Axios from 'axios';
import Login from './Login.js';
import ServerUtils from '../ServerUtils';
import CSVUtils from '../CSVUtils'
import process from './dataAnalysis.js';

const SERVER_URL = ServerUtils.getServerUrl();

const PanelContainer = styled.div`
  padding-top: '25',
  padding-bottom: '25'
`;

const DownloadButton = styled.button`
  margin-top: '5',
  margin-bottom: '20'
`;

const SubmitStatus = styled.p`
  padding-top: '25px',
  padding-bottom: '25px'
`;

class UserIdForm extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      this.setState({value: e.target.value});
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.downloadDataForUser(this.state.value);
    }

    render() {
      return (
          <form onSubmit={this.handleSubmit}>
              
              <input type="text" value={this.state.value} onChange={this.handleChange}/>{' '}
              <DownloadButton type="submit" className="btn btn-primary">
                  <FontAwesomeIcon icon={faDownload}/>{' '}
                  Download data for given userId
              </DownloadButton>
          </form>
      );
    }
}

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configOnServer: {},
            formData: {},
            authenticated: false,
            username: null,
            password: null,
            renderSubmitStatus: false,
            submitMsg: null,
          };
    }

    onSubmit({ formData }) {
      Axios.post(`${SERVER_URL}/config`, formData, {
          auth: {
            username: this.state.username,
            password: this.state.password,
          },
        }).then(() => this.setState({ 
          configOnServer: formData,
          renderSubmitStatus: true,
          submitMsg: "Submitted Successfully" 
        })) .catch(error => {
          console.log(error);
          this.setState({
            renderSubmitStatus: true,
            submitMsg: "Error Submitting"
          })
        });
    }

    onChange({ formData }) {
      this.setState({
          formData
      });
    }

    onServerData(data) {
      console.log(data);
      this.setState({
          configOnServer: data,
          formData: data,
      });
    }

    onClose(e) {
        const { configOnServer, formData } = this.state;
        if (JSON.stringify(configOnServer) !== JSON.stringify(formData)) {
            e.preventDefault();
            return 'You have unsaved changes';
        }
        return null;
    }

    onLogin(username, password) {
      this.setState({
          authenticated: true,
          username,
          password
      });
    }

    downloadData(response) { 
      let processedData = [];
        for (let i = 0; i < response.data.length; i++) {
            processedData.push(process(response.data[i].sessiondata, response.data[i].participantid));
        }
        processedData.sort((a, b) => (a.participantid < b.participantid) ? 1 : -1)

        CSVUtils.JSONToCSVConvertor(processedData, 'Behavior Analysis Data', true);
    }

    downloadAllData() {
      ServerUtils.getData(this.state.username, this.state.password).then((response) => {
        this.downloadData(response);
      });
    }

    downloadDataForUser = (user) => {
      ServerUtils.getDataforUser(this.state.username, this.state.password, user).then((response) => {
        this.downloadData(response);
      });
    }

    renderPanel() {
        const { formData } = this.state;
        return (
            <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"/>
                <Fetch url={`${SERVER_URL}/config`} as="json" onDataChange={d => this.onServerData(d)}>
                    <PanelContainer className="panel container">
                        <h2>Download all collected data</h2>
                        <DownloadButton onClick={() => { this.downloadAllData() }} type="button" className="btn btn-primary">
                            <FontAwesomeIcon icon={faDownload}/>
                            {' '}
                            Download all collected data
                        </DownloadButton>
                        <hr/>
                        <h2>Download data for given userId</h2>
                        <UserIdForm
                            username={this.state.username}
                            password={this.state.password}
                            downloadDataForUser={this.downloadDataForUser}/>
                        <hr/>
                        <h2>Configure Experiment</h2>
                        <Form   
                            className="configForm"
                            schema={schema}
                            formData={formData}
                            onChange={f => this.onChange(f)}
                            onSubmit={f => this.onSubmit(f)}
                        />
                        <SubmitStatus> {this.state.submitMsg} </SubmitStatus>
                    </PanelContainer>
                </Fetch>
          </div>
        );
    }

    render() {
      if (!this.state.authenticated) {
        return (
          <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"/>
            <Login onLogin={this.onLogin.bind(this)} />
          </div>
        );
      }
      return this.renderPanel();
    }

}

export default AdminPanel;
