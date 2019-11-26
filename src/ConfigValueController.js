import _ from "lodash";

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
        this.conditionAColor = "#a6cff5";
        this.conditionBColor = "#e87474";
        this.conditionCColor = "#84b5ab";
        this.conditionDColor = "#b8f5be";
        this.configString = "sampleString";
    }
   
    update(configValues) {
        this.warningDuration = _.get(configValues, "warningDuration", 5);
        this.indicatorDuration = _.get(configValues, "indicatorDuration", 10);
        this.lossOfPointsStartLowerBound = _.get(configValues, "lossOfPointsStartLowerBound", 20);
        this.lossOfPointsStartUpperBound = _.get(configValues, "lossOfPointsStartUpperBound", 30);
        this.pointsPerDecrement = _.get(configValues, "pointsPerDecrement", 1);
        this.pointsDecrementDuration = _.get(configValues, "pointsDecrementDuration", 10);
        this.conditionDuration = _ .get(configValues, "conditionDuration", 600);
        this.soundOn = _.get(configValues, "soundOn", true);
        this.conditionAColor = _.get(configValues, "conditionAColor", "#a6cff5");
        this.conditionBColor = _.get(configValues, "conditionBColor", "#e87474");
        this.conditionCColor = _.get(configValues, "conditionCColor", "#84b5ab");
        this.conditionDColor = _ .get(configValues, "conditionDColor", "#b8f5be");
        this.configString = _.get(configValues, "configString", "sampleString");
    }

    getWarningDuration() {
        return this.warningDuration;
    }

    getIndicatorDuration() {
        return this.indicatorDuration;
    }

    getLossOfPointsStart() {
        return Math.floor((Math.random() * (this.getLossOfPointsStartUpperBound() - this.getLossofPointsStartLowerBound()))  + this.getLossofPointsStartLowerBound());
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

    getConfigString() {
        return this.configString;
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
            conditionDColor: this.conditionDColor,
            configString: this.configString
        })
    }

}

export default new ConfigValuesController();
