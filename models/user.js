const mongoose = require('mongoose');
const { isEmail } = require('validator');

const utils = require('../utils/auth');

const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        email: {
            type: String,
            required: [true, 'Please enter an Email'],
            unique: true,
            validate: [isEmail, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            minlength: [5, 'Minimum password length is 5 characters'],
        },
        full_name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

// Pre function to hash password before saving user
userSchema.pre('save', async function (next) {
    this.password = await utils.hashPassword(this.password);

    next();
});

// Static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if (user) {
        const auth = await utils.verifyPassword(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('User with this email address does not exist');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
