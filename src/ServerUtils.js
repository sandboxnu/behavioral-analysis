import Axios from 'axios';

const SERVER_URL = 'https://api.sandboxnu.com';

class ServerUtils {
  getServerUrl() {
    return SERVER_URL;
  }

  sendDefaultJson() {
    return {
        "warningDuration": 5,
        "indicatorDuration": 10,
        "lossOfPointsStartLowerBound": 20,
        "lossOfPointsStartUpperBound": 30,
        "pointsPerDecrement": 1,
        "pointsDecrementDuration": 10,
        "conditionDuration": 600,
        "soundOn": true,
        "conditionAColor": "blue",
        "conditionBColor": "red",
        "conditionCColor": "yellow",
        "conditionDColor": "green"
    };
  }
}

export default new ServerUtils();