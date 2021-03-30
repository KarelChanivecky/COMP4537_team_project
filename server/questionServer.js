import express from 'express';
import bodyParser from 'body-parser';
import {addQuestion, getQuestions, updateQuestion} from './dataSource.mjs';
const PORT = 10000;

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://karelc.com');
    res.setHeader('Access-Control-Allow-Headers', "content-type");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT");
    next();
});

app.get('/questions', (req, res, next) => {
    console.log("getting questions");
    getQuestions()
        .then(questions => {
            if (questions.length === 0) {
                res.status(404).send({message: "No questions in db"});
                return;
            }
            res.send(questions);
        })
        .catch(next);
});

app.post('/questions', (req, res, next) => {
    console.log("posting question: " + req.body);
    if (req.body.choices.length < 2 || 4 < req.body.length ) {
        res.status(409).send("Questions must contain between 2 and 4 questions");
    }
    addQuestion(req.body)
        .then(question_id => res.status(201).send({new_question_id: question_id}))
        .catch(next);
});

app.put('/questions', (req, res, next) => {
    console.log("Updating question: " + req.body);
    if (req.body.choices.length < 2 || 4 < req.body.length ) {
        res.status(409).send("Questions must contain between 2 and 4 questions");
    }
    updateQuestion(req.body)
        .then(() => res.status(200).send({message: "updated"}))
        .catch()
});

console.log("listening .....");

app.listen(PORT);