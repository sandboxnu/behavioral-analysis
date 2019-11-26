import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Experiment from './Experiment';
import styled from 'styled-components';
import ConfigValueController from '../ConfigValueController';

const Screen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.div`
  margin-bottom: 0.25em;
  font-size: 4em;
  color: #f7b733;
`
const Subtitle = styled.div`
  margin-bottom: 1.5em;
  font-size: 1em;
  margin: auto; 
  width: 30em;
  margin-bottom: 2em;
  color: #393e47;
`
const ScreenContainer = styled.div`
  margin: auto;
  text-align: center;
`
const InfoBox = styled.div`
  background-color: #f7b733;
  color: white;
  padding: .5em;
  font-size: 1.2em;
  border-radius: .5em;
  align: center;
  margin: auto;
  width: 55%;
`

class End extends Component {
  render() {
    let daScore = 5;
    let daString = ConfigValueController.getConfigString();
    return (
      <Screen>
        <ScreenContainer>
          <Title> Behavioral Analysis</Title>
          <Subtitle>You've reached the end!<br />Please contact your researcher.</Subtitle>
          <InfoBox>Score:{' '}{daScore}<br />Configuration String:{' '}{daString}</InfoBox>
        </ScreenContainer>
      </Screen>
    );
  }
}

export default End;
