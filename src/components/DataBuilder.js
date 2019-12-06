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
        let event = {}
        event.timestamp = time;
        event.eventName = eventName;

        this.events.push(event);
    }

    setUserID(userId) {
        this.userId =  userId;
    }

    setCondition(condition) {
        this.condition = condition;
    }

    getDataObject() {
        this.obj.participantId = this.userId;
        this.data.condition = this.condition;
        this.data.events = this.events;
        this.obj.data = this.data;
        
        return this.obj;
    }
}

export default DataBuilder;



