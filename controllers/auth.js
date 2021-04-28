const Model = require('../models/user');
const utils = require('../utils/auth');

const auth_register = (req, res) => {
    const details = req.body;

    Model.create(details)
        .then((user) => {
            const {
                email,
                _id,
                full_name,
                phone,
                description,
                username,
            } = user;
            const userInfo = {
                _id,
                email,
                full_name,
                phone,
                description,
                username,
            };

            const token = utils.createToken(userInfo);

            res.status(201).send({
                message: 'Successfully registered!',
                token,
                userInfo,
            });
        })
        .catch((err) => {
            const { errCode, errors } = utils.handleErrors(err);
            res.status(errCode).send({ errors });
        });
};

const auth_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Model.login(email, password);
        const userInfo = {
            _id: user._id,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            description: user.description,
            username: user.username,
        };

        const token = utils.createToken(userInfo);

        res.status(202).send({
            message: 'Successfully Logged In!',
            token,
            userInfo,
        });
    } catch (err) {
        const { errCode, errors } = utils.handleErrors(err);
        res.status(errCode).send({ errors });
    }
};

module.exports = {
    auth_login,
    auth_register,
};
