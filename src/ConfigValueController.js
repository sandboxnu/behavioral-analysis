import _ from 'lodash';

class ConfigValuesController {
    constructor() {
        this.warningDuration = 30;
        this.warningStartLowerBound = 20;
        this.warningStartUpperBound = 30;
        this.pointsPerDecrement = 1;
        this.secondsUntilPointDecrement = 10;
        this.conditionDuration = 30;
        this.soundOn = true;
        this.conditionAColor = 'blue';
        this.conditionBColor = 'red';
        this.conditionCColor = 'yellow';
        this.conditionDColor = 'green';
    }
   
    update(configValues) {
        let testConfigValues = {
            warningDuration: 30,
            warningStartLowerBound: 20,
            warningStartUpperBound: 30,
            pointsPerDecrement: 1,
            secondsUntilPointDecrement: 10,
            conditionDuration: 30,
            soundOn: true,
            conditionAColor: 'blue',
            conditionBColor: 'red',
            conditionCColor: 'yellow',
            conditionDColor: 'green'
        };

        this.warningDuration = _.get(testConfigValues, "warningDuration", 30);
        this.warningStartLowerBound = _.get(testConfigValues, "warningStartLowerBound", 20);
        this.warningStartUpperBound = _.get(testConfigValues, "warningStartUpperBound", 30);
        this.pointsPerDecrement = _.get(testConfigValues, "pointsPerDecrement", 1);
        this.secondsUntilPointDecrement = _.get(testConfigValues, "secondsUntilPointDecrement", 10);
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

    getWarningStartLowerBound() {
        return this.warningStartLowerBound;
    }
    
    getWarningStartUpperBound() {
        return this.warningStartUpperBound;
    }

    getPointsPerDecrement() {
        return this.pointsPerDecrement;
    }

    getSecondsUntilPointDecrement() {
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
