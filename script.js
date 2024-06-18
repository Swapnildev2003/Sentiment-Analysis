const input = document.getElementById("input");
const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");
const s3 = document.getElementById("s3");
const s4 = document.getElementById("s4");



function analyze() {
    const value = input.value;
    const exclamationRegex = /!/g;
    const exclamationMatches = value.match(exclamationRegex);
    // console.log(exclamationMatches)
    const numExclamations = exclamationMatches ? exclamationMatches.length : 0;
    s4.innerHTML = numExclamations;
    // console.log(s4.innerHTML)
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'bfc752120cmsh8332e41c4ea7dbdp1bd2c0jsnd1d0f4ed82bc',
            'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
        },
        body: `{ "language": "english", "text":"${value}"}`
    };

    fetch('https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1', options)
        .then(response => response.json())
        // .then(response => console.log(response.sentiment_list[0]))

        .then(response => {
            if (response.sentiment_list && response.sentiment_list.length > 1) {
                s1.innerHTML = response.sentiment_list[1].pos || 'N/A';
                s2.innerHTML = response.sentiment_list[1].neu || 'N/A';
                s3.innerHTML = response.sentiment_list[1].neg || 'N/A';
            } else {
                console.error('Sentiment list is empty or does not have the expected structure');
                // You can provide fallback values or display an error message to the user here.
            }
        })
        .catch(err => console.error(err));

}

function refresh() {
    s1.innerHTML = 0;
    s2.innerHTML = 0;
    s3.innerHTML = 0;
    s4.innerHTML = 0;
    input.value = "";

}

// const natural = require('natural');
// const csv = require('csv-parser');
// const fs = require('fs');

// const tokenizer = new natural.WordTokenizer();
// const classifier = new natural.BayesClassifier();

// // Load the sarcasm dataset
// const dataset = [];
// fs.createReadStream('test-balanced.csv')
//     .pipe(csv())
//     .on('data', function (data) {
//         dataset.push([data.comment, data.label]);
//     })
//     .on('end', function () {
//         // Preprocess the data
//         const preprocessedData = dataset.map(([text, label]) => ({
//             features: tokenizer.tokenize(text),
//             label: label === '1' ? 'sarcastic' : 'non-sarcastic',
//         }));

//         // Split the data into training and testing sets
//         const splitIndex = Math.floor(preprocessedData.length * 0.8);
//         const trainingData = preprocessedData.slice(0, splitIndex);
//         const testingData = preprocessedData.slice(splitIndex);

//         // Train the classifier using machine learning
//         classifier.train(trainingData);

//         // Test the classifier on the testing data
//         let numCorrect = 0;
//         testingData.forEach(({ features, label }) => {
//             const predictedLabel = classifier.classify(features);
//             if (predictedLabel === label) {
//                 numCorrect++;
//             }
//         });
//         const accuracy = numCorrect / testingData.length;

//         console.log(`The classifier has an accuracy of ${accuracy}`);

//         // Classify a new sentence
//         const sentence = "I can't wait to spend my entire day in traffic.";
//         const features = tokenizer.tokenize(sentence);
//         if (classifier.classifierType) {
//             const classification = classifier.classify(features);
//             console.log(`The sentence "${sentence}" is ${classification}`);
//         } else {
//             console.log('The classifier has not been trained yet.');
//         }
//     });
