import axios from "axios";

const DOMAIN = "";
const API_PATH = "";
const PORT = "";
const PROTOCOL = "https";
const BASE_URL = `${PROTOCOL}://${DOMAIN}:${PORT}${API_PATH}`;

const Methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

const Routes = {
    loginUser : () => "/user/login",
    createUser: () => "/user/create",
    lists: () => "/lists",
    listItems: listId => `/lists/${listId}/items`
    listItem: (listId, itemId) => `/lists/${listId}/items/${itemId}`,
    endpoints: () => "/endpoints"
};


const ax = () => axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        "Authorization" : `Bearer ${sessionStorage.getItem("jwt")}`,
    }
});

/**
 * Log a user in
 * @param {User} user
 * @return {Promise<string>}
 */
function loginUser(user) {
    sessionStorage.removeItem("jwt");
    return new Promise((resolve, reject) => {

        ax().post(Routes.loginUser(), user)
            /** @param {string} r.data.jwt */
            .then(r => {
                if (!r.data.jwt) {
                    reject({status: r.status, reason: "No token received"})
                }
                sessionStorage.setItem("jwt", r.data.jwt);
                resolve();
            })
            .catch(reject);
    });
}

/**
 * Add user to system
 * @param {User} user
 * @return {Promise<string>}
 */
function createUser(user) {
    sessionStorage.removeItem("jwt");
    return new Promise((resolve, reject) => {
        ax().post(Routes.createUser(), user)
            /** @param {string} r.data.jwt */
            .then(r => {
                if (!r.data.jwt) {
                    reject({status: r.status, reason: "No token received"})
                }
                sessionStorage.setItem("jwt", r.data.jwt);
                resolve();
            })
            .catch(reject);
    });
}

/**
 * Get all the lists for a user
 * @param {User} user
 * @return {Promise<TodoList[]>}
 */
function getLists(user) {
    return new Promise((resolve, reject) => {
        ax().get(Routes.lists())
            .then(resolve)
            .catch(reject);
    });
}

/**
 * Add a new todo list for user
 * @param {User} user
 * @param {TodoList} list
 * @return {Promise<void>}
 */
function createList(user, list) {
    return new Promise((resolve, reject) => {

    });
}

/**
 * Edits the description of list
 * @param {TodoList} newList
 * @return {Promise<void>}
 */
function editList(newList) {
    return new Promise((resolve, reject) => {

    });
}

/**
 * Remove a list from service
 * @param {TodoList} list
 * @return {Promise<void>}
 */
function deleteList(list) {
    return new Promise((resolve, reject) => {

    });
}


/**
 * Get all the lists items for a list
 * @param {User} user
 * @return {Promise<TodoListItem[]>}
 */
function getListItems(user) {
    return new Promise((resolve, reject) => {

    });
}


/**
 * Add a new list item to todo list
 * @param {TodoList} list
 * @param {TodoListItem} item
 * @return {Promise<void>}
 */
function addListItem(list, item) {
    return new Promise((resolve, reject) => {

    });
}

/**
 * Edit a list item to todo list
 * @param {TodoListItem} newItem
 * @return {Promise<void>}
 */
function editListItem(newItem) {
    return new Promise((resolve, reject) => {

    });
}

/**
 * Edit a list item to todo list
 * @param {TodoListItem} item
 * @return {Promise<void>}
 */
function deleteListItem(item) {
    return new Promise((resolve, reject) => {

    });
}

/**
 * Get the counts for all the endpoints
 * @return {Promise<Endpoint[]>}
 */
function getEndpointCounts() {
    return new Promise((resolve, reject) => {

    });
}




