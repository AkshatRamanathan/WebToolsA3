const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('./session');

const app = express()
const port = 3000

app.use(cookieParser());
app.get('/', session, (req, res) => {

    req.session.data = "hello"; //testing purpose
    res.send(`Session created -> ${req.sessionID} : ${JSON.stringify(req.session)}`)
})

const validateAuth = (req, res, next) => {
    let id = req.cookies.sessionId; //fetch cookie
    if (!id) res.status(403).send("forbidden"); //if no cookie, forbidden link
    else {
        let sessionData = req.app.locals.sessions[id]; //fetch data from store
        req.session = sessionData //set session data in req for easy access
        next(); //doChain
    }

}

app.get('/protected', validateAuth, (req, res) => {
    req.session.data = "hello2"; //modify to test

    res.status(200).send(`Im in!\n Updated Session is : ${JSON.stringify(req.session)}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})