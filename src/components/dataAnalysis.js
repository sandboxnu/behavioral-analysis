
// import { testData } from "./TestData";

// var testData = { 
//     "events": [ 
//         {
//             "timestamp": 1,
//             "gamestate": {},
//             "eventName": "beginTrial",
//         },
//         {
//             "timestamp": 2,
//             "gamestate": {},
//             "eventName": "questionAppeared",
//         },
//         {
//             "timestamp": 4,
//             "gamestate": {},
//             "eventName": "answeredCorrectly",
//         },
//         {
//             "timestamp": 5,
//             "gamestate": {},
//             "eventName": "questionAppeared",
//         },
//         {
//             "timestamp": 7,
//             "gamestate": {},
//             "eventName": "answeredWrong",
//         },
//         {
//             "timestamp": 8,
//             "gamestate": {},
//             "eventName": "endTrial",
//         },
//         {
//             "timestamp": 10,
//             "gamestate": {},
//             "eventName": "beginTrial",
//         },
//         {
//             "timestamp": 11,
//             "gamestate": {},
//             "eventName": "questionAppeared",
//         },
//         {
//             "timestamp": 15,
//             "gamestate": {},
//             "eventName": "warningAppeared",
//         },
//         {
//             "timestamp": 18,
//             "gamestate": {},
//             "eventName": "warningInteraction",
//         },
//         {
//             "timestamp": 19,
//             "gamestate": {},
//             "eventName": "answeredCorrectly",
//         },
//         {
//             "timestamp": 20,
//             "gamestate": {},
//             "eventName": "endTrial",
//         },
//     ]
// };

// to test
// console.log(process(testData));

// takes in all of the events -> returns processed event data
function process(allData, participantid) {

    // copy the data to avoid mutation
    let data = allData.events.slice();
    let condition = allData.condition;
    // console.log(data);

    // get arrays of the times we want collected
    let questionAnswerTime = timeBetween("questionAppeared", "answeredCorrectly", "answeredWrong", data);
    let trialTime = timeBetween("endTrial", "beginTrial", "beginTrial", data);
    let warningInteractionTime = timeBetween("warningAppeared", "warningInteraction", "warningInteraction", data);
    

    // compute the averages
    let avgQuestionAnswerTime = average(questionAnswerTime);
    let avgTrialTime = average(trialTime);
    let avgWarningInteractionTime = average(warningInteractionTime)
    let questionAnswerWrongAvg = average(timeBetween("questionAppeared", "answeredWrong", "answeredWrong", data));
    let questionAnswerCorrectAvg = average(timeBetween("questionAppeared", "answeredCorrectly", "answeredCorrectly", data));

    // json data structure to send back
    let processedData = {};
    processedData.participantid = participantid;
    processedData.condition = condition;

    let questionToAnswer = {};
    questionToAnswer.times = questionAnswerTime;
    questionToAnswer.average = avgQuestionAnswerTime;
    processedData.questionToAnswer = questionToAnswer;

    let trialToTrial = {};
    trialToTrial.times = trialTime;
    trialToTrial.average = avgTrialTime;
    processedData.trialToTrial = trialToTrial;

    let warningToInteraction = {};
    warningToInteraction.times = warningInteractionTime;
    warningToInteraction.average = avgWarningInteractionTime;
    processedData.warningToInteraction = warningToInteraction;

    processedData.questionAnswerWrongAvg = questionAnswerWrongAvg;
    processedData.questionAnswerCorrectAvg = questionAnswerCorrectAvg;

    // var processedData = `{
    //     participantid: ${participantid},
    //     condition: ${condition},
    //     questionToAnswer: {
    //         times : ${questionAnswerTime},
    //         average : ${avgQuestionAnswerTime},
    //     },
    //     trialToTrial: {
    //         times : ${trialTime},
    //         average : ${avgTrialTime},
    //     },
    //     warningToInteraction: {
    //         times : ${warningInteractionTime},
    //         average : ${avgWarningInteractionTime},
    //     }, 
    //     questionAnsweredWrongAvg: ${questionAnswerWrongAvg},
    //     questionAnsweredCorrectAvg: ${questionAnswerCorrectAvg},
    // }`;

    // return the data
    return processedData;
}


// returns an array containing the times between an initial event and ending event for all of the data
// there are 2 ending events for the case of a question appearing and it being answered so both can be passed in
function timeBetween(initEvent, endEvent1, endEvent2, data) {
    let arr = [];
    let initTime = -1;
    let endTime = 0;

    for (let index = 0; index < data.length; index++) {
        let thisEvent = data[index];
        //console.log("name: " + thisEvent.eventName + "index: " + index);
        if (thisEvent.eventName === initEvent) {
            console.log("INITIAL EVENT: " + index);
            initTime = thisEvent.timestamp;
        } else if (thisEvent.eventName === endEvent1 || thisEvent.eventName === endEvent2) {
            console.log("FINAL EVENT: " + index);
            endTime = thisEvent.timestamp;
            if (initTime !== -1) {
                arr.push(endTime - initTime);
                // console.log("end time: " + endTime);
                // console.log("start time: " + initTime);
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