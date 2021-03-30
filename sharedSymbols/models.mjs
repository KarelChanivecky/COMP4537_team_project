/**
 * A User Model
 * @param {string} email
 * @param {string} pass
 */
function User(email, pass){
    this.email = email;
    this.pass = pass;
}

/**
 * A List Model
 * @param {string} description
 * @param {number} id
 */
function List(description, id=null){
    this.description = description;
    this.id = id;
}

/**
 * A ListItem Model
 * @param {string} description
 * @param {number} id
 */
function ListItem(description, id=null){
    this.description = description;
    this.id = id;
}