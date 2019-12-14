import ConfigValueController from "../ConfigValueController";

class DataBuilder {
    constructor() {
        this.obj = {};
        this.data = {};
        this.events = [];
        this.userId = "";
        this.condition = "";
    }

    addEvent(eventName, time) {
        let event = {};
        let currentTime = new Date();
        event.timestamp = currentTime.getTime();
        event.gameTime = time;
        event.eventName = eventName;

        this.events.push(event);
    }

    setUserID(userId) {
        this.userId =  userId;
    }

    setCondition(condition) {
        this.condition = condition;
    }

    getDataObject(score) {
        const conditionTime = ConfigValueController.getConditionDuration();
        this.obj.participantId = this.userId;
        this.data.condition = this.condition;
        this.data.events = this.events;
        this.data.pointsps = score/conditionTime;
        this.data.score = score;
        this.obj.data = this.data;
        
        
        return this.obj;
    }
}

export default DataBuilder;




