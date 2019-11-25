import React from 'react';
import styled, {keyframes} from 'styled-components';

const slide = keyframes`
    100% {
        left: 0px;
    }
`;

const IndicatorButton = styled.button`
    width: 190px;
    height: 80px; 
    border-radius: 0.5em;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: ${props => props.textColor};
    background-color: ${props => props.backgroundColor};
    text-align: center;
    position: absolute;

    margin-left: 20px;
    margin-top: 20px;

    left: -190px;
    animation-name: ${slide};
    animation-delay: 0s;
    animation-duration: 3s;
    animation-fill-mode: forwards;
`;

class Indicator extends React.Component {
    constructor(props) {
        super(props);
    }

    sendIndicatorInteraction = () => {
        this.props.parentCallbackIndicator();
    }

    renderIndicator() {
        if (this.props.shouldShowIndicator) {
            return (
                <IndicatorButton 
                    textColor="white" 
                    backgroundColor="lightsteelblue" 
                    className="indicatorButton" onClick={() => this.sendIndicatorInteraction()}>
                </IndicatorButton>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderIndicator()}
            </div>
        );
    }
}

export default Indicator