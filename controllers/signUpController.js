const bcrypt = require('bcryptjs');
const insertUser = require('../db/queries').insertUser;
const pool = require('../db/pool');
const { check, body, validationResult } = require('express-validator');

const validateUser = [
    check('firstName')
        .isAlpha()
        .withMessage('can only contain letters')
        .notEmpty()
        .withMessage('is required'),
    check('lastName')
        .isAlpha()
        .withMessage('can only contain letters')
        .notEmpty()
        .withMessage('is required'),
    check('username')
        .isAlphanumeric()
        .withMessage('can only contain letters and numbers')
        .isLength({ min: 3, max: 15 })
        .withMessage('must be between 3 and 15 characters')
        .notEmpty()
        .withMessage('is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('must contain at least one letter'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];

const createUser = async (req, res, next) => {
    const { firstName, lastName, password, confirmPassword, username } = req.body;
    const errors = validationResult(req);

    const errorMessages = {};

    if (!errors.isEmpty()) {
        errors.array().forEach((err) => {
            if (!errorMessages[err.path]) errorMessages[err.path] = [];
            errorMessages[err.path].push(err.msg);
        });

        return res.render('index', {
            auth: req.isAuthenticated(),
            showLoginModal: false,
            message: '',
            errorMessages,
            formData: { firstName, lastName, username },
        });
    }

    if (password === confirmPassword) {
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                next(err);
            }

            try {
                await insertUser({
                    firstName,
                    lastName,
                    hashedPassword,
                    username,
                });

                const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
                    username,
                ]);

                req.login(rows[0], (err) => {
                    if (err) return next(err);

                    res.redirect('/');
                });
            } catch (err) {
                return next(err);
            }
        });
    }
};

module.exports = { createUser, validateUser };
