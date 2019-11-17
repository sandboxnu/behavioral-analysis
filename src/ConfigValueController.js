import _ from 'lodash';

class ConfigValuesController {
    constructor() {
        this.warningDuration = 5;
        this.lossOfPointsLowerBound = 20;
        this.lossOfPointsUpperBound = 30;
        this.pointsPerDecrement = 1;
        this.durationOfLossOfPoints = 10;
        this.conditionDuration = 30;
        this.soundOn = true;
        this.conditionAColor = 'blue';
        this.conditionBColor = 'red';
        this.conditionCColor = 'yellow';
        this.conditionDColor = 'green';
    }
   
    update(configValues) {
        let testConfigValues = {
            warningDuration: 5,
            lossOfPointsLowerBound: 20,
            lossOfPointsUpperBound: 30,
            pointsPerDecrement: 1,
            durationOfLossOfPoints: 10,
            conditionDuration: 30,
            soundOn: true,
            conditionAColor: 'blue',
            conditionBColor: 'red',
            conditionCColor: 'yellow',
            conditionDColor: 'green'
        };

        this.warningDuration = _.get(testConfigValues, "warningDuration", 5);
        this.lossOfPointsLowerBound = _.get(testConfigValues, "lossOfPointsLowerBound", 20);
        this.lossOfPointsUpperBound = _.get(testConfigValues, "lossOfPointsUpperBound", 30);
        this.pointsPerDecrement = _.get(testConfigValues, "pointsPerDecrement", 1);
        this.durationOfLossOfPoints = _.get(testConfigValues, "durationOfLossOfPoints", 10);
        this.conditionDuration = _ .get(testConfigValues, "conditionDuration", 30);
        this.soundOn = _.get(testConfigValues, "soundOn", true);
        this.conditionAColor = _.get(testConfigValues, "conditionAColor", "blue");
        this.conditionBColor = _.get(testConfigValues, "conditionBColor", "red");
        this.conditionCColor = _.get(testConfigValues, "conditionCColor", "yellow");
        this.conditionDColor = _ .get(testConfigValues, "conditionDColor", "green");
    }

    getWarningDuration() {
        return this.warningDuration;
    }

    getLossOfPointsStart() {
        return Math.floor(Math.random() * (this.getLossOfPointsUpperBound() - this.getLossOfPointsLowerBound()) + this.getLossOfPointsLowerBound()) ;
    }

    getLossOfPointsLowerBound() {
        return this.lossOfPointsLowerBound;
    }

    getLossOfPointsUpperBound() {
        return this.lossOfPointsUpperBound;
    }
    
    getPointsPerDecrement() {
        return this.pointsPerDecrement;
    }

    getDurationOfLossOfPoints() {
        return this.durationOfLossOfPoints;
    }

    getConditionDuration() {
        return this.conditionDuration;
    }

    getSoundOn() {
        return this.soundOn;
    }

    getConditionAColor() {
        return this.conditionAColor;
    }

    getConditionBColor() {
        return this.conditionBColor;
    }

    getConditionCColor() {
        return this.conditionCColor;
    }

    getConditionDColor() {
        return this.conditionDColor;
    }

    getConfigurableValues() {
        return ({
            warningDuration: this.warningDuration,
            lossOfPointsLowerBound: this.lossOfPointsLowerBound,
            lossOfPointsUpperBound: this.lossOfPointsUpperBound,
            pointsPerDecrement: this.pointsPerDecrement,
            durationOfLossOfPoints: this.durationOfLossOfPoints,
            conditionDuration: this.conditionDuration,
            soundOn: this.soundOn,
            conditionAColor: this.conditionAColor,
            conditionBColor: this.conditionBColor,
            conditionCColor: this.conditionCColor,
            conditionDColor: this.conditionDColor
        })
    }

}

export default new ConfigValuesController();
