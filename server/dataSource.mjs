import mysql from 'mysql'
import sha1 from 'js-sha1'
import { User, List, ListItem } from '../sharedSymbols/models.mjs'

const ProcedureNames = {
    ADD_USER: 'addUser',
    CHECK_CREDENTIALS: 'checkCredentials',
    ADD_LIST: 'addList',
    ADD_LIST_ITEM: 'addListItem',
    GET_USER_LISTS: 'getUserLists',
    GET_LIST_ITEMS: 'getListItems',
    UPDATE_LIST: 'updateList',
    UPDATE_LIST_ITEM: 'updateListItem',
    DELETE_LIST: 'deleteList',
    DELETE_LIST_ITEM: 'deleteListItem',
    CHECK_LIST_OWNERSHIP: 'checkListOwnership',
    CHECK_ITEM_OWNERSHIP: 'checkItemOwnership',
    GET_HIT_COUNT: 'getEndpointCounts'
}


//TODO: update credentials
function getConnection() {
    console.log("getting connection")
    return mysql.createConnection({
        host: 'localhost',
        user: 'comp4537_team_assignment',
        password: 'password',
        database: 'todo_db'
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
        let db = getConnection();
        const callQuery = createCallQuery(procName, args.length);
        db.query(callQuery, args, (err, results) => {
            db.end();
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

/**
 * Adds a user to db
 * @param {User} user
 * @returns {Promise.<number, Error>} On result, passes the id of the user just created
 */
function addUser(user) {
    return new Promise((resolve, reject) => {
        const pass_hash = sha1(user.pass);
        callProcedure(ProcedureNames.ADD_USER, [user.email, pass_hash])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot insert user"))
                }
                const userId = result[0][0]["LAST_INSERT_ID()"];
                resolve(userId);
            }, reject);
    });
}

/**
 * Adds a list to db
 * @param {number} userId
 * @param {List} list
 * @returns {Promise.<void, Error>} 
 */
function addList(userId, list) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.ADD_LIST, [userId, list.description])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot insert list"))
                }
                resolve()
            }, reject);
    });
}

/**
 * Adds a listItem to db
 * @param {number} listId
 * @param {ListItem} listItem
 * @returns {Promise.<void, Error>} On result, passes the id of the listItem just created
 */
function addListItem(listId, listItem) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.ADD_LIST_ITEM, [listId, listItem.description])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot insert list item"))
                }
                console.log(result);
                resolve();
            }, reject);
    });
}

/**
 * check credentials for a user in db
 * @param {User} user
 * @returns {Promise.<number, Error>} On result, passes the id of the authenticated user
 */
function checkUser(user) {
    return new Promise((resolve, reject) => {
        const pass_hash = sha1(user.pass);
        callProcedure(ProcedureNames.CHECK_CREDENTIALS, [user.email, pass_hash])
            //TODO: need to change this part as checkCredentials is not returning userId
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot verify user"))
                }
                if (result[0].length === 0) {
                    resolve(-1);
                }
                else {
                    const userId = result[0][0].userId;
                    resolve(userId);
                }

            }, reject);
    });
}

/**
 * check ownership for a list user in db
 * @param {number} userId
 * @param {number} listId
 * @returns {Promise.<number, Error>} On result, passes value 1
 */
function checkListOwnership(userId, listId) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.CHECK_LIST_OWNERSHIP, [userId, listId])
            .then(result => {
                //TODO: need to check if it is result[0] or just result
                if (result[0] === 0) {
                    reject(Error("Cannot verify list ownership"))
                }
                resolve(result[0]);
            }, reject);
    });
}

/**
 * check ownership for a item user in db
 * @param {number} userId
 * @param {number} itemId
 * @returns {Promise.<number, Error>} On result, passes value 1
 */
function checkItemOwnership(userId, itemId) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.CHECK_ITEM_OWNERSHIP, [userId, itemId])
            .then(result => {
                //TODO: need to check if it is result[0] or just result
                if (result[0] === 0) {
                    reject(Error("Cannot verify item ownership"))
                }
                resolve(result[0]);
            }, reject);
    });
}

/**
 * Gets all the lists from db.
 * @param {number} userId
 * @returns {Promise.<array<List>, Error>}
 */
function getLists(userId) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.GET_USER_LISTS, [userId])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot get lists"))
                }
                const lists = [];
                result[0].map(list => lists.push(new List(list.description, list.listId)))
                resolve(lists);
            }, reject);
    });
}

/**
 * Gets all the list Items from db.
 * @param {number} listId
 * @returns {Promise.<array<ListItem>, Error>}
 */
function getListItems(listId) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.GET_LIST_ITEMS, [listId])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot get items"))
                }
                const items = [];
                result[0].map(item => items.push(new ListItem(item.description, item.itemId)))
                resolve(items);
            }, reject);
    });
}

/**
 * Updates a list in db
 * @param {number} listId
 * @param {List} list
 * @returns {Promise.<void, Error>}
 */
function updateList(listId, list) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.UPDATE_LIST,
            [listId, list.description])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot update list"))
                }
                console.log("list update result: " + result);
                resolve()
            }, reject);
    });
}

/**
 * Updates a list item in db
 * @param {number} itemId
 * @param {ListItem} item
 * @returns {Promise.<void, Error>}
 */
function updateListItem(itemId, item) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.UPDATE_LIST_ITEM,
            [itemId, item.description])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot update list item"))
                }
                console.log("list item update result: " + result);
                resolve()
            }, reject);
    });
}

/**
 * deletes a list in db
 * @param {number} listId
 * @returns {Promise.<void, Error>}
 */
function deleteList(listId) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.DELETE_LIST,
            [listId])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot delete list"))
                }
                console.log("list delete result: " + result);
                resolve()
            }, reject);
    });
}

/**
 * deletes a list item in db
 * @param {number} itemId
 * @returns {Promise.<void, Error>}
 */
function deleteListItem(itemId) {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.DELETE_LIST_ITEM,
            [itemId])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot delete item"))
                }
                console.log("item delete result: " + result);
                resolve()
            }, reject);
    });
}

/**
 * gets list of endpoint hit counts from db
 */
function getEndpointCount() {
    return new Promise((resolve, reject) => {
        callProcedure(ProcedureNames.GET_HIT_COUNT,
            [])
            .then(result => {
                if (result.length === 0) {
                    reject(Error("Cannot get hit counts"))
                }
                console.log("hit count result: ");
                console.log(result);
                resolve(result[0])
            }, reject);
    });
}

export {
    addUser, addList, addListItem,
    checkUser, checkListOwnership, checkItemOwnership,
    getLists, getListItems,
    updateList,
    updateListItem,
    deleteList, deleteListItem,
    getEndpointCount
};