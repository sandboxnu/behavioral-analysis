
// takes in all of the events -> returns processed event data
function process(allData, participantid) {

    // copy the data to avoid mutation
    let data = allData.events.slice();
    let condition = allData.condition;
    let pointsps = allData.pointsps;
    let score = allData.score;
    // console.log(data);

    // get arrays of the times we want collected
    let questionAnswerTime = timeBetween("questionAppeared", "answeredCorrectly", "answeredWrong", data);
    let trialTime = timeBetween("endTrial", "beginTrial", "beginTrial", data);
    let warningInteractionTime = timeBetween("warningAppeared", "warningInteraction", "warningInteraction", data);
    

    // compute the averages
    let avgQuestionAnswerTime = average(questionAnswerTime);
    let medianQuestionAnswerTime = median(questionAnswerTime);
    let avgTrialTime = average(trialTime);
    let medianTrialTime = median(trialTime);
    let avgWarningInteractionTime = average(warningInteractionTime)
    let medianWarningInteractionTime = median(warningInteractionTime)
    let avgQuestionAnswerWrong = average(timeBetween("questionAppeared", "answeredWrong", "answeredWrong", data));
    let medianQuestionAnswerWrong= median(timeBetween("questionAppeared", "answeredWrong", "answeredWrong", data));
    let avgQuestionAnswerCorrect = average(timeBetween("questionAppeared", "answeredCorrectly", "answeredCorrectly", data));
    let medianQuestionAnswerCorrect = median(timeBetween("questionAppeared", "answeredCorrectly", "answeredCorrectly", data));


    // json data structure to send back
    let processedData = {};
    processedData.participantid = participantid;
    processedData.condition = condition;
    processedData.pointsPerSecond = pointsps;
    processedData.score = score;

    processedData.questionToAnswerAverage = avgQuestionAnswerTime.toString();
    processedData.questionAnswerWrongAverage = avgQuestionAnswerWrong.toString();
    processedData.questionAnswerCorrectAverage = avgQuestionAnswerCorrect.toString();
    processedData.trialToTrialAverage = avgTrialTime.toString();
    processedData.warningToInteractionAverage = avgWarningInteractionTime.toString();
    processedData.questionToAnswerMedian = medianQuestionAnswerTime.toString();
    processedData.questionAnswerWrongMedian = medianQuestionAnswerWrong.toString();
    processedData.questionAnswerCorrectMedian = medianQuestionAnswerCorrect.toString();
    processedData.trialToTrialMedian = medianTrialTime.toString();
    processedData.warningToInteractionMedian = medianWarningInteractionTime.toString();

    return processedData;
}

function median(values){
    if(values.length ===0) return 0;
  
    values.sort(function(a,b){
      return a-b;
    });
  
    var half = Math.floor(values.length / 2);
  
    if (values.length % 2)
      return values[half];
  
    return (values[half - 1] + values[half]) / 2.0;
  }

// returns an array containing the times between an initial event and ending event for all of the data
// there are 2 ending events for the case of a question appearing and it being answered so both can be passed in
function timeBetween(initEvent, endEvent1, endEvent2, data) {
    let arr = [];
    let initTime = -1;
    let endTime = 0;

    for (let index = 0; index < data.length; index++) {
        let thisEvent = data[index];
        if (thisEvent.eventName === initEvent) {
            initTime = thisEvent.timestamp;
        } else if (thisEvent.eventName === endEvent1 || thisEvent.eventName === endEvent2) {
            endTime = thisEvent.timestamp;
            if (initTime !== -1) {
                arr.push(endTime - initTime);
            }
        }
    }
    return arr;
}

// returns the average given an array
function average(arr) {
    let avg = arr.reduce((a,b) => a + b, 0) / arr.length;
    return avg;
}

export default process;