const updateMemberStatus = require('../db/queries').updateMemberStatus;

const updateMembership = async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            await updateMemberStatus(req.user.id);
            return res.redirect('/');
        } catch (err) {
            next(err);
        }
    }
    return res.render('index', {
        auth: req.isAuthenticated(),
        showLoginModal: true,
        formData: {},
        errorMessages: {},
        message: '',
    });
};

module.exports = updateMembership;
