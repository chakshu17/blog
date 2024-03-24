const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String
    }
})

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password, 8);
    }
    next();
})

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

UserSchema.statics.FindByCred = async (email, password) => {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
        throw new Error("User not Found");
    }

    const matched = await bcryptjs.compare(password, user.password);

    if (!matched) {
        throw new Error("Invalid Password");
    }
    return user;
};

UserSchema.methods.generateToken = async function () {
    const user = this;
    const token = await jwt.sign(
        { _id: user._id },
        "blogApplication"
    );
    if (!token) {
        throw new Error("Please Login Again");
    }

    user.token = token;
    await user.save();
    return token;
};

const UserModel = new mongoose.model('user', UserSchema)
module.exports = UserModel;