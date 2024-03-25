const jwt = require("jsonwebtoken");
const Users = require("../model/user/user");
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        const decode = jwt.verify(token, "blogApplication");
        const user = await Users.findOne({
            _id: decode._id,
            "token": token,
        });
        if (!user) {
            throw new Error("User Not Found");
        }
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(400).send({
            error: "Auth Token Not Present",
        });
    }
};
module.exports = auth;