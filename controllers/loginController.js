const passport = require('passport');

const loginAuth = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('index', {
                auth: req.isAuthenticated(),
                showLoginModal: true,
                message: info.message,
                errorMessages: {},
                formData: {},
            });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

module.exports = { loginAuth };
