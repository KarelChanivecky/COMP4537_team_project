import mysql from 'mysql'
import {Choice, Question} from '../sharedSymbols/models.mjs'

let db = getConnection();

const ProcedureNames = {
    CREATE_QUESTION: 'create_question',
    ADD_CHOICE: 'add_choice',
    UPDATE_QUESTION: 'update_question',
    UPDATE_CHOICE: 'update_choice',
    GET_QUESTIONS: 'get_questions',
    GET_RIGHT_ANSWERS: 'get_right_answers'
}

db.on('err', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        db = getConnection()
    } else {
        throw err;
    }
});

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'comp4537_individual_assignment',
        password: 'bad_password',
        database: 'quiz_db'
    });
}

/**
 * Create an escaped sql query.
 *
 * @param {string} procName
 * @param {number} argCount
 * @returns {string}
 */
function createCallQuery(procName, argCount) {
    const escapeChar = '?';
    const escapeCharSequence = escapeChar.repeat(argCount).split("").join(", ");
    return `call ${procName} (${escapeCharSequence});`
}

/**
 *
 * @param procName
 * @param args
 * @returns {Promise<array<?>, Error>}
 */
function callProcedure(procName, args = []) {
    return new Promise((resolve, reject) => {
        const callQuery = createCallQuery(procName, args.length);
        db.query(callQuery, args, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

/**
 * Adds a question to db
 * @param {Question} question
 * @returns {Promise.<number, Error>} On result, passes the id of the question just created
 */
function addQuestion(question) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.CREATE_QUESTION, [question.description, question.correctAnswerIndex])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot insert question"))
                }
                const questionId = result[0][0].questionId;
                const promises = question.choices.map(choice => addChoice(choice, questionId));
                Promise.all(promises).then(_ => resolve(questionId), reject);
            }, reject);
    });
}

/**
 * Gets all the questions from db.
 *
 * @returns {Promise.<array<Question>, Error>}
 */
function getQuestions() {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.GET_QUESTIONS)
            .then(result => {

                const questionChoicesRows = result[0];
                const questionDescriptions = {};
                const choices = {};
                for (let questionChoicesRow of questionChoicesRows) {

                    if (!choices[questionChoicesRow.questionId]) {
                        choices[questionChoicesRow.questionId] = [];
                    }
                    choices[questionChoicesRow.questionId]
                        .push(new Choice(questionChoicesRow.choiceDescription,
                            questionChoicesRow.choiceId));

                    if (!questionDescriptions[questionChoicesRow.questionId]) {
                        questionDescriptions[questionChoicesRow.questionId] = {
                            description: questionChoicesRow.questionDescription,
                            correctAnswerIndex: questionChoicesRow.correctAnswerIndex
                        };
                    }
                }

                const questions = [];
                for (const [question_id, info] of Object.entries(questionDescriptions)) {
                    questions.push(new Question(info.description,
                        choices[question_id],
                        info.correctAnswerIndex,
                        parseInt(question_id)));
                }
                resolve(questions);
            })
            .catch(reject);
    });
}

/**
 * Updates a question in db
 * @param {Question} question
 * @returns {Promise.<void, Error>}
 */
function updateQuestion(question) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.UPDATE_QUESTION,
            [question.questionId, question.description, question.correctAnswerIndex])
            .then(Promise.all(question.choices
                .map(choice => addChoice(choice, question.questionId))))
            .then(resolve, reject);
    });
}

/**
 * Adds a new choice to db.
 *
 * @param {Choice} choice
 * @param {number} questionId
 * @returns {Promise<?, Error>}
 */
function addChoice(choice, questionId) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.ADD_CHOICE, [choice.description, questionId])
            .then(resolve, reject);
    });
}

export {addQuestion, updateQuestion, getQuestions};