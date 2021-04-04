/**
 * A User Model
 * @param {string} email
 * @param {string} pass
 */
export function User(email, pass){
    this.email = email;
    this.pass = pass;
}

/**
 * A List Model
 * @param {string} description
 * @param {number} id
 */
export function TodoList(description, id=null){
    this.description = description;
    this.id = id;
}

/**
 * A TodoListItem Model
 * @param {string} description
 * @param {number} id
 */
export function TodoListItem(description, id=null){
    this.description = description;
    this.id = id;
}

/**
 * An endpoint Model
 * @param {string} method
 * @param {string} name
 * @param {Number} count - The number of times an endpoint has been hit
 * @constructor
 */
export function Endpoint(method, name, count) {
    this.method = method;
    this.name = name;
    this.count = count;
}