const signUpRouter = require('./signUpRouter');
const loginRouter = require('./loginRouter');
const logoutRouter = require('./logoutRouter');
const indexRouter = require('./indexRouter');
const newMessageRouter = require('./newMessageRouter');
const updateMemberStatusRouter = require('./updateMemberStatusRouter');

module.exports = {
    signUpRouter,
    loginRouter,
    logoutRouter,
    indexRouter,
    newMessageRouter,
    updateMemberStatusRouter,
};
