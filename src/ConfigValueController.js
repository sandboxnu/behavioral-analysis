import _ from 'lodash';

class ConfigValuesController {
    constructor() {
        this.warningDuration = 5;
        this.indicatorDuration = 10;
        this.lossOfPointsStartLowerBound = 20;
        this.lossOfPointsStartUpperBound = 30;
        this.pointsPerDecrement = 1;
        this.pointsDecrementDuration = 10;
        this.conditionDuration = 600;
        this.soundOn = true;
        this.conditionAColor = 'blue';
        this.conditionBColor = 'red';
        this.conditionCColor = 'yellow';
        this.conditionDColor = 'green';
    }
   
    update(configValues) {
        let testConfigValues = {
            warningDuration: 5,
            indicatorDuration: 10,
            lossOfPointsStartLowerBound: 20,
            lossOfPointsStartUpperBound: 30,
            pointsPerDecrement: 1,
            pointsDecrementDuration: 10,
            conditionDuration: 600,
            soundOn: true,
            conditionAColor: 'blue',
            conditionBColor: 'red',
            conditionCColor: 'yellow',
            conditionDColor: 'green'
        };

        this.warningDuration = _.get(testConfigValues, "warningDuration", 5);
        this.indicatorDuration = _.get(testConfigValues, "indicatorDuration", 10);
        this.lossOfPointsStartLowerBound = _.get(testConfigValues, "lossOfPointsStartLowerBound", 20);
        this.lossOfPointsStartUpperBound = _.get(testConfigValues, "lossOfPointsStartUpperBound", 30);
        this.pointsPerDecrement = _.get(testConfigValues, "pointsPerDecrement", 1);
        this.pointsDecrementDuration = _.get(testConfigValues, "pointsDecrementDuration", 10);
        this.conditionDuration = _ .get(testConfigValues, "conditionDuration", 600);
        this.soundOn = _.get(testConfigValues, "soundOn", true);
        this.conditionAColor = _.get(testConfigValues, "conditionAColor", "blue");
        this.conditionBColor = _.get(testConfigValues, "conditionBColor", "red");
        this.conditionCColor = _.get(testConfigValues, "conditionCColor", "yellow");
        this.conditionDColor = _ .get(testConfigValues, "conditionDColor", "green");
    }

    getWarningDuration() {
        return this.warningDuration;
    }

    getIndicatorDuration() {
        return this.indicatorDuration;
    }

    getLossOfPointsStart() {
        return (Math.random() * (this.getLossOfPointsStartUpperBound() - this.getLossofPointsStartLowerBound()))  + this.getLossofPointsStartLowerBound();
    }

    getLossofPointsStartLowerBound() {
        return this.lossOfPointsStartLowerBound;
    }
    
    getLossOfPointsStartUpperBound() {
        return this.lossOfPointsStartUpperBound;
    }

    getPointsPerDecrement() {
        return this.pointsPerDecrement;
    }

    getPointsDecrementDuration() {
        return this.secondsUntilPointDecrement;
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

    getColorForCondition(condition) {
        switch(condition) {
            case "A":
                return this.conditionAColor;
                break;
            case "B":
                return this.conditionBColor;
                break;
            case "C":
                return this.conditionCColor;
                break;
            case "D":
                return this.conditionDColor;
        }
    }

    getConfigurableValues() {
        return ({
            warningDuration: this.warningDuration,
            warningStartLowerBound: this.warningStartLowerBound,
            warningStartUpperBound: this.warningStartUpperBound,
            pointsPerDecrement: this.pointsPerDecrement,
            secondsUntilPointDecrement: this.secondsUntilPointDecrement,
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
