const express = require('express');
const app = express();
const path = require('node:path');
const passport = require('passport');
const sessionConfig = require('./config/session');
const routers = require('./routes/routers');
const cors = require('cors');

app.use(cors());

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);
app.use(passport.session());

require('./config/passport');

app.use('/', routers.indexRouter);
app.use('/sign-up', routers.signUpRouter);
app.use('/login', routers.loginRouter);
app.use('/log-out', routers.logoutRouter);
app.use('/newMessage', routers.newMessageRouter);
app.use('/activatemembership', routers.updateMemberStatusRouter);

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { errorMessages: 'Something went wrong!' });
});

const PORT = 4000;
app.listen(PORT);
