const crypto = require('crypto');
const SESSION_MAX_AGE = 2 * 60 * 1000; // 2 mins in milliseconds

const sessionMiddleware = (req, res, next) => {
    let sessionId = req.cookies.sessionId; //fetch sessionid from cookie

    if (!sessionId) { //if not exists, generate and set cookie
        sessionId = crypto.randomBytes(32).toString('hex');
        res.cookie('sessionId', sessionId, { maxAge: SESSION_MAX_AGE, httpOnly: true });
    }

    if (!req.app.locals.sessions) { //if in-memory session store not exists, initialize it
        req.app.locals.sessions = {};
    }

    req.session = req.app.locals.sessions[sessionId] || {}; //fetch data from store, if not exists, initialize it

    req.app.locals.sessions[sessionId] = req.session; // set session data (maybe modified back to store)

    res.on('finish', () => {
        req.app.locals.sessions[sessionId] = req.session; //same as before for streamed data chunks
    });
    req.sessionID = sessionId; //set sessionID in req for easy access
    next(); //doChain
};

module.exports = sessionMiddleware;