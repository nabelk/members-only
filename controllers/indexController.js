const getMessages = require('../db/queries').getMessages;

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
};

const showMessages = async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            let messages = await getMessages();
            messages = messages.map((message) => {
                return { ...message, added: formatDate(message.added) };
            });
            return res.render('index', {
                auth: req.isAuthenticated(),
                messages,
                showLoginModal: false,
                memberstatus: req.user.memberstatus,
                user: {
                    username: req.user.username,
                    firstName: req.user.firstname,
                    lastName: req.user.lastname,
                },
            });
        } catch (err) {
            next(err);
        }
    } else {
        res.render('index', {
            auth: req.isAuthenticated(),
            showLoginModal: false,
            message: '',
            errorMessages: {},
            formData: {},
        });
    }
};

module.exports = { showMessages };
