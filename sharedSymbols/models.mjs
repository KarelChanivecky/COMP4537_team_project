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
export function List(description, id=null){
    this.description = description;
    this.id = id;
}

/**
 * A ListItem Model
 * @param {string} description
 * @param {number} id
 */
export function ListItem(description, id=null){
    this.description = description;
    this.id = id;
}