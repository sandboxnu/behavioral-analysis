import Axios from 'axios';

const SERVER_URL = 'https://api.sandboxnu.com';

class ServerUtils {
  sendData(collected) {
    // Using axios http lib to send post request with formdata.
    // fetch, xmlhttprequest, jquery etc. could also be used.
    Axios.post(`${SERVER_URL}/data`, collected)
      .then((response) => {
        console.log(response);
      })
     .catch(error => console.log(error));
  }

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
        "conditionAColor": "#a6cff5",
        "conditionBColor": "#e87474",
        "conditionCColor": "#84b5ab",
        "conditionDColor": "#b8f5be"
    };
  }
}

export default new ServerUtils();