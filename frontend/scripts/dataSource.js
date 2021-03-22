import {Question} from '../../sharedSymbols/models.mjs'

const BASE_URL = "https://karelc.com/COMP4537_individual_project/api";
// const BASE_URL = "localhost";
// const PORT = 443;

/**
 * make http request
 * @param path
 * @param method
 * @param reqBody
 * @returns {Promise<string, number>}
 */
function request(path, method, reqBody) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open(method, `${BASE_URL}${path}`, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(reqBody);
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status < 200 || 299 < req.status) {
                    reject(req.status);
                    return;
                }
                resolve(req.responseText);
            }
        }
    });

}

/**
 * Send a question
 * @param {Question} question
 */
function sendQuestion(question) {
    return new Promise((resolve, reject) => {
        request("/questions", "POST", JSON.stringify(question))
            .then(resolve, reject);
    });
}

/**
 * Update a question
 * @param {Question} question
 */
function updateQuestion(question) {
    return new Promise((resolve, reject) => {
        request("/questions", "PUT", JSON.stringify(question))
            .then(resolve, reject);
    });
}

/**
 * Get all the questions in db.
 *
 * @returns {Promise<array<Question>>}
 */
function getQuestions() {
    return new Promise((resolve, reject) => {
        request("/questions", "GET")
            .then(questionText => resolve(JSON.parse(questionText)) , reject);
    });
}


export {getQuestions, sendQuestion, updateQuestion};