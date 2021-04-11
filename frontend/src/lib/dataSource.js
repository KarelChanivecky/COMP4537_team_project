import axios from "axios";
import {Endpoint} from "./models.mjs";

const DOMAIN = "gurdensingh.live";
const API_PATH = "/api/v1";
const PORT = "";
const PROTOCOL = "https";
const BASE_URL = `${PROTOCOL}://${DOMAIN}:${PORT}${API_PATH}`;


const Routes = {
    loginUser : () => `/user/login`,
    createUser: () => `/user/create`,
    lists: () => `/lists`,
    list: (listId) => `/lists/${listId}`,
    listItems: listId => `/lists/${listId}/items`,
    listItem: (listId, itemId) => `/lists/${listId}/items/${itemId}`,
    endpoints: () => `/endpoints`
};


const ax = () => axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Authorization" : `Bearer ${sessionStorage.getItem("jwt")}`,
    }
});

/**
 * Log a user in
 * @param {User} user
 * @return {Promise<string>}
 */
export function loginUser(user) {
    sessionStorage.removeItem("jwt");
    return new Promise((resolve, reject) => {

        ax().post(Routes.loginUser(), user)
            /** @param {string} r.data.authToken */
            .then(r => {
                if (!r.data.authToken) {
                    reject({status: r.status, message: "No token received"})
                }
                sessionStorage.setItem("jwt", r.data.authToken);
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
export function createUser(user) {
    sessionStorage.removeItem("jwt");
    return new Promise((resolve, reject) => {
        ax().post(Routes.createUser(), user)
            /** @param {string} r.data.authToken */
            .then(r => {
                if (!r.data.authToken) {
                    reject({status: r.status, message: "No token received"})
                }
                sessionStorage.setItem("jwt", r.data.authToken);
                resolve();
            })
            .catch(reject);
    });
}

/**
 * Get all the lists for a user
 * @return {Promise<TodoList[]>}
 */
export function getLists() {
    return new Promise((resolve, reject) => {
        ax().get(Routes.lists())
            .then(res => resolve(res.data.lists))
            .catch(reject);
    });
}

/**
 * Add a new todo list for user
 * @param {TodoList} list
 * @return {Promise<void>}
 */
export function createList(list) {
    return new Promise((resolve, reject) => {
        ax().post(Routes.lists(), list)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * Edits the description of list
 * @param {TodoList} newList
 * @return {Promise<void>}
 */
export function editList(newList) {
    return new Promise((resolve, reject) => {
        ax().put(Routes.list(newList.id), newList)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * Remove a list from service
 * @param {TodoList} list
 * @return {Promise<void>}
 */
export function deleteList(list) {
    return new Promise((resolve, reject) => {
        ax().delete(Routes.list(list.id))
            .then(resolve)
            .catch(reject);
    });
}


/**
 * Get all the lists items for a list
 * @param {TodoList} list
 * @return {Promise<TodoListItem[]>}
 */
export function getListItems(list) {
    return new Promise((resolve, reject) => {
        ax().get(Routes.listItems(list.id))
            .then(res => resolve(res.data.items))
            .catch(reject);
    });
}


/**
 * Add a new list item to todo list
 * @param {TodoList} list
 * @param {TodoListItem} item
 * @return {Promise<void>}
 */
export function createListItem(list, item) {
    return new Promise((resolve, reject) => {
        ax().post(Routes.listItems(list.id), item)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * Edit a list item to todo list
 * @param {TodoList} list
 * @param {TodoListItem} newItem
 * @return {Promise<void>}
 */
export function editListItem(list, newItem) {
    return new Promise((resolve, reject) => {
        ax().put(Routes.listItem(list.id, newItem.id), newItem)
            .then(resolve)
            .catch(reject);
    });
}

/**
 * Edit a list item to todo list
 * @param {TodoList} list
 * @param {TodoListItem} item
 * @return {Promise<void>}
 */
export function deleteListItem(list, item) {
    return new Promise((resolve, reject) => {
        ax().delete(Routes.listItem(list.id, item.id))
            .then(resolve)
            .catch(reject);
    });
}


function mapToEndpoints(fromDb) {
    return fromDb.map(end => {
        const [method, name] = end.endpointName.split(" ");
        return new Endpoint(method, name, end.hitCount);
    });
}

/**
 * Get the counts for all the endpoints
 * @return {Promise<Endpoint[]>}
 */
export function getEndpointCounts() {
    return new Promise((resolve, reject) => {
        ax().get(Routes.endpoints())
            .then(res => resolve(mapToEndpoints(res.data.endpoints)))
            .catch(reject);
    });
}




