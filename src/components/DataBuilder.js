
class DataBuilder {
    constructor() {
        this.obj = {};
        this.data = {};
        this.events = [];
        this.userId = "";
        this.condition = "";
    }

    addEvent(eventName, time) {
        const obj = `{
            timestamp: ${time},
            eventName: ${eventName},
        }`

        this.events.push(obj);
        console.log("EVENT: " + eventName);
    }

    setUserID(userId) {
        this.userId =  userId;
    }

    buildData(condition) {
        this.condition = condition;

        this.obj.userId = this.userId;
        this.obj.condition = condition;
        this.data.events = this.events;
        this.obj.data = this.data;
        // TODO: send data to server
    }
}

export default DataBuilder;




