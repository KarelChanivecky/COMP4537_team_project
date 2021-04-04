import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import {
    addUser, addList, addListItem,
    checkUser, checkListOwnership, checkItemOwnership,
    getLists, getListItems,
    updateList,
    updateListItem,
    deleteList, deleteListItem
} from './dataSource.mjs';

const PORT = 10000;
const SECRET = "gurden_karel_webdev_project";

const OK = 200;
const CREATED = 201;
const ACCEPTED = 202;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_ERR = 500;
const NOT_IMPLEMENTED = 501;

const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); //https://karelc.com
    res.setHeader('Access-Control-Allow-Headers', "content-type");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    next();
});

function getToken(userId) {
    const token = jwt.sign({ id: userId }, SECRET, { expiresIn: '8h' });
    return token;
}

function verifyToken(token) {
    try {
        var decoded = jwt.verify(token, SECRET);
    } catch (err) {
        console.log("cannot verify token");
        return("-1")
    }
    return decoded.id;
}

// -------- CREATE USER --------
app.post('/user/create', (req, res, next) => {
    console.log("trying to add user: " + req.body);
    if(!req.body.email || !req.body.pass) {
        res.status(BAD_REQUEST).json({
            message: "incomplete information in the request"
        })
    }
    addUser(req.body)
    .then(userId => {
        const token = getToken(userId.toString());
        res.status(CREATED).json({
            authToken: token
        })
    })
    .catch(err => {
        res.status(INTERNAL_ERR).json({
            message: err
        })
    });
});

// -------- LOGIN USER --------
app.post('/user/login', (req, res, next) => {
    console.log("trying to log in: " + req.body);
    checkUser(req.body)
    .then(userId => {
        if(userId === -1) {
            res.status(NOT_FOUND).json({
                message: "user not found"
            })
        }
        else{
            const token = getToken(userId.toString());
            res.status(ACCEPTED).json({
                authToken: token
            })
        }
    })
    .catch(err => {
        res.status(INTERNAL_ERR).json({
            message: err
        })
    });
});

// -------- GET LISTS --------
app.get('/lists', (req, res, next) => {
    console.log("getting lists");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(BAD_REQUEST).json({
            message: "login first"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        const userId = verifyToken(token);
        if(userId === "-1") {
            res.status(UNAUTHORIZED).json({
                message: "cannot verify token"
            })
        }
        else {
            getLists(parseInt(userId))
            .then(TODOLists => {
                res.status(OK).json({lists: TODOLists});
            })
            .catch(err => {
                res.status(INTERNAL_ERR).json({
                    message: err
                })
            });
        }
    }
});

// -------- GET LIST ITEMS --------
app.get('/lists/:id/items', (req, res, next) => {
    console.log("getting list items");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(BAD_REQUEST).json({
            message: "login first"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        const userId = verifyToken(token);
        if(userId === "-1") {
            res.status(UNAUTHORIZED).json({
                message: "cannot verify token"
            })
        }
        else {
            let errStatus = INTERNAL_ERR;
            checkListOwnership(parseInt(userId), req.params.id)
            .then(response => {
                if(!response) {
                    errStatus = UNAUTHORIZED;
                    throw Error("not the list owner")
                }
                return getListItems(req.params.id);
            })
            .then(TODOItems => {
                res.status(OK).json({items: TODOItems});
            })
            .catch(err => {
                res.status(errStatus).json({
                    message: err
                })
            });
        }
    }
});

// -------- CREATE LIST --------
app.post('/lists', (req, res, next) => {
    console.log("creating new list");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(BAD_REQUEST).json({
            message: "login first"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        const userId = verifyToken(token);
        if(userId === "-1") {
            res.status(UNAUTHORIZED).json({
                message: "cannot verify token"
            })
        }
        else {
            addList(parseInt(userId), req.body)
            .then(id => {
                res.status(CREATED).json({listId: id});
            })
            .catch(err => {
                res.status(INTERNAL_ERR).json({
                    message: err
                })
            });
        }
    }
});

// -------- CREATE LIST ITEM --------
app.post('/lists/:id/items', (req, res, next) => {
    console.log("creating new list item");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(BAD_REQUEST).json({
            message: "login first"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        const userId = verifyToken(token);
        if(userId === "-1") {
            res.status(UNAUTHORIZED).json({
                message: "cannot verify token"
            })
        }
        else {
            let errStatus = INTERNAL_ERR;
            checkListOwnership(parseInt(userId), req.params.id)
            .then(response => {
                if(!response) {
                    errStatus = UNAUTHORIZED;
                    throw Error("not the list owner")
                }
                return addListItem(req.params.id, req.body);
            })
            .then(id => {
                res.status(CREATED).json({itemId: id});
            })
            .catch(err => {
                res.status(errStatus).json({
                    message: err
                })
            });
        }
    }
});

// -------- UPDATE LIST --------
app.put('/lists/:id', (req, res, next) => {
    console.log("updating list");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(BAD_REQUEST).json({
            message: "login first"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        const userId = verifyToken(token);
        if(userId === "-1") {
            res.status(UNAUTHORIZED).json({
                message: "cannot verify token"
            })
        }
        else {
            let errStatus = INTERNAL_ERR;
            checkListOwnership(parseInt(userId), req.params.id)
            .then(response => {
                if(!response) {
                    errStatus = UNAUTHORIZED;
                    throw Error("not the list owner")
                }
                return updateList(req.params.id, req.body);
            })
            .then(resp_ => {
                res.status(ACCEPTED).end();
            })
            .catch(err => {
                res.status(errStatus).json({
                    message: err
                })
            });
        }
    }
});

// -------- UPDATE LIST ITEM --------
app.put('/lists/:id/items/:itemId', (req, res, next) => {
    console.log("updating list item");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(BAD_REQUEST).json({
            message: "login first"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        const userId = verifyToken(token);
        if(userId === "-1") {
            res.status(UNAUTHORIZED).json({
                message: "cannot verify token"
            })
        }
        else {
            let errStatus = INTERNAL_ERR;
            checkItemOwnership(parseInt(userId), req.params.itemId)
            .then(response => {
                if(!response) {
                    errStatus = UNAUTHORIZED;
                    throw Error("not the item owner")
                }
                return updateListItem(req.params.itemId, req.body);
            })
            .then(resp_ => {
                res.status(ACCEPTED).end();
            })
            .catch(err => {
                res.status(errStatus).json({
                    message: err
                })
            });
        }
    }
});

// -------- DELETE LIST --------
app.delete('/lists/:id', (req, res, next) => {
    console.log("deleting list");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(BAD_REQUEST).json({
            message: "login first"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        const userId = verifyToken(token);
        if(userId === "-1") {
            res.status(UNAUTHORIZED).json({
                message: "cannot verify token"
            })
        }
        else {
            let errStatus = INTERNAL_ERR;
            checkListOwnership(parseInt(userId), req.params.id)
            .then(response => {
                if(!response) {
                    errStatus = UNAUTHORIZED;
                    throw Error("not the list owner")
                }
                return deleteList(req.params.id);
            })
            .then(resp_ => {
                res.status(ACCEPTED).end();
            })
            .catch(err => {
                res.status(errStatus).json({
                    message: err
                })
            });
        }
    }
});

// -------- DELETE LIST ITEM --------
app.delete('/lists/:id/items/:itemId', (req, res, next) => {
    console.log("deleting list item");
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(BAD_REQUEST).json({
            message: "login first"
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        const userId = verifyToken(token);
        if(userId === "-1") {
            res.status(UNAUTHORIZED).json({
                message: "cannot verify token"
            })
        }
        else {
            let errStatus = INTERNAL_ERR;
            checkItemOwnership(parseInt(userId), req.params.itemId)
            .then(response => {
                if(!response) {
                    errStatus = UNAUTHORIZED;
                    throw Error("not the item owner")
                }
                return deleteListItem(req.params.itemId);
            })
            .then(resp_ => {
                res.status(ACCEPTED).end();
            })
            .catch(err => {
                res.status(errStatus).json({
                    message: err
                })
            });
        }
    }
});

console.log("listening .....");

app.listen(PORT);