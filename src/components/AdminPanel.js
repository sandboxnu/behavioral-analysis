import React, { Component } from 'react';
import Form from 'react-jsonschema-form-bs4';
import Fetch from 'react-fetch-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import schema from '../ConfigValuesSchema';

const SERVER_URL = 'https://api.sandboxneu.com/test/';

const PanelContainer = styled.div`
    padding-top: '25',
    padding-bottom: '25'
`;

const DownloadButton = styled.button`
    margin-top: '5',
    margin-bottom: '20'
`;

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configOnServer: {},
            formData: {}
        };
    }

    // TODO: post form data, add authenication
    onSubmit({ formData }) {
        const file = new File([JSON.stringify(formData)], 'config.json');
        const form = new FormData();
        form.append('file', file);
    }

    onChange({ formData }) {
        this.setState({
            formData
        });
    }

    onServerData(data) {
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

    //TODO: implement onPassword()

    // TODO: implement downloadData()
    downloadData() {
        console.log("Clicked download!")
    }

    renderPanel() {
        const { formData } = this.state;
        return (
            <PanelContainer className="panel container">
                <h2>Download collected data</h2>
                <DownloadButton onClick={() => { this.downloadData(); }} type="button" className="btn btn-primary">
                    <FontAwesomeIcon icon={faDownload}/>
                    {' '}
                    Download collected data
                </DownloadButton>
                <hr/>
                <h2>Configure Experiment</h2>
                <Form
                    className="configForm"
                    schema={schema}
                    formData={formData}
                    onChange={f => this.onChange(f)}
                    onSubmit={f => this.onSubmit(f)}
                />
            </PanelContainer>
        );
    }

    // TODO: add authentication
    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
                <Fetch url={`${SERVER_URL}/experiment`} as="json" onDataChange={d => this.onServerData(d)}>
                        {() => this.renderPanel()}
                </Fetch>
            </div>
        );
    }

}

export default AdminPanel;
