const express = require('express');
const UserRoute = new express.Router();
const UserModel = require('../../model/user/user')

UserRoute.post('/register', async (req, res) => {
    try {
        const user = new UserModel({ ...req.body })
        if (!user) {
            throw new Error("User Not Registered")
        }
        const saved = await user.save();
        if (!saved) {
            throw new Error("User Not Registered")
        }
        res.status(200).send({
            message: "User Created successfully",
            data: null
        })
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
        })
    }
})

UserRoute.post("/login", async (req, res) => {
    try {
        const user = await UserModel.FindByCred(req.body.email, req.body.password);
        if (!user) {
            throw new Error("Login Again");
        }
        const token = await user.generateToken();
        if (!token) {
            throw new Error("Login Again");
        }

        res.status(200).send({
            message: "Login Successfully",
            data: user,
        });
    } catch (err) {
        res.status(403).send({ message: err.message, error: err });
    }
});

UserRoute.post("/forgot-password", async (req, res) => {
    try {
        const user = await UserModel.find({ email: req.body.email });
        if (user.length <= 0) {
            throw new Error(
                "User with email not found ,please try with different email"
            );
        }
        res.status(200).send({
            message: "User found",
            data: {
                userId: user[0]._id,
            },
        });
    } catch (err) {
        res.status(500).send({ message: err.message, error: err });
    }
});

UserRoute.post("/change-password", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId);

        if (!user) {
            throw new Error("Password can't be changed, Try again");
        }
        if (req.body.password !== req.body.conformPassword) {
            throw new Error("");
        }
        user.password = req.body.password;
        const saved = user.save();
        if (!saved) {
            throw new Error("Password can't be changed, Try again");
        }
        res.status(200).send({
            message: "User password updated",
            data: null,
        });
    } catch (err) {
        res.status(500).send({ message: err.message, error: err });
    }
});

module.exports = UserRoute