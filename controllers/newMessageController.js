const insertMessage = require('../db/queries').insertMessage;

const createNewMessage = async (req, res) => {
    const { message } = req.body;
    if (req.isAuthenticated()) {
        await insertMessage({ message, userid: req.user.id, memberstatus: req.user.memberstatus });
        return res.redirect('/');
    }

    return res.render('index', {
        auth: req.isAuthenticated(),
        showLoginModal: true,
        formData: {},
        errorMessages: {},
        message: '',
    });
};

module.exports = createNewMessage;
