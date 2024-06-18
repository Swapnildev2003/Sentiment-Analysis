import { WordTokenizer, BayesClassifier } from 'natural';

// Create a tokenizer to break the sentence into words
const tokenizer = new WordTokenizer();

// Create a classifier and train it on a dataset of sarcastic and non-sarcastic sentences
const classifier = new BayesClassifier();
classifier.addDocument('I just love waiting in line for hours', 'sarcastic');
classifier.addDocument('Wow, I never thought standing in the rain would be so much fun', 'sarcastic');
classifier.addDocument('This is the best day of my life...', 'non-sarcastic');
classifier.addDocument('I can\'t wait to clean the whole house', 'non-sarcastic');
classifier.addDocument("I am looking forward to spending time with my family this weekend.", 'non-sarcastic');
classifier.train();

// Define a function to check if a sentence is sarcastic or not
function isSarcastic(sentence) {
    // Tokenize the sentence into words
    const features = tokenizer.tokenize(sentence);

    // Classify the sentence as sarcastic or non-sarcastic
    const classification = classifier.classify(features);

    // Return true if the sentence is classified as sarcastic, false otherwise
    if (classification === 'sarcastic')
        return "sentence is sarcastic";
    else
        return "not sarcastic";
}

// Example usage:
console.log(isSarcastic("I can't wait to spend my entire Saturday doing laundry")); // true
console.log(isSarcastic("I love waking up at 5am to go to work")); // false

// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             console.log(body); // Log the value of the 'body' variable
//             // Preprocess and classify the input value


//             // Send the classification result back to the client
//             res.writeHead(200, { 'Content-Type': 'text/plain' });
//             res.end(classification);
//         });
//     } else {
//         let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
//         let extname = path.extname(filePath);
//         let contentType = 'text/html';

//         switch (extname) {
//             case '.css':
//                 contentType = 'text/css';
//                 break;
//             case '.js':
//                 contentType = 'text/javascript';
//                 break;
//         }

//         fs.readFile(filePath, (err, content) => {
//             if (err) {
//                 if (err.code === 'ENOENT') {
//                     // File not found
//                     res.writeHead(404);
//                     res.end('File not found');
//                 } else {
//                     // Server error
//                     res.writeHead(500);
//                     res.end('Server error');
//                 }
//             } else {
//                 // Success
//                 res.writeHead(200, { 'Content-Type': contentType });
//                 res.end(content, 'utf-8');
//             }
//         });
//     }
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

