import React from 'react';
import './Indicator.css';

class Indicator extends React.Component {
    constructor(props) {
        super(props);
    }

    sendIndicatorInteraction = () => {
        this.props.parentCallbackIndicator();
    }

    renderIndicator() {
        if (this.props.condition === "C" || this.props.condition === "D") {
            return (
                <button className="indicatorButton" onClick={() => this.sendIndicatorInteraction()}>Indicator Button for condition {this.props.condition}</button>
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