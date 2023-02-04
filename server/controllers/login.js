const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { getUserWithPassword } = require('../db/api/User/queries');

const controller = (req, res, next) => {
    const { username, password } = req.body;
    getUserWithPassword(username).then((user) => {
        bcrypt.compare(password, user.password).then((passed) => {
            if (!passed) {
                return res.status(400).send({
                    message: 'Wrong credential'
                })
            }
            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, "RANDOM-TOKEN", { expiresIn: "24h" });

            res.status(200).send({
                message: "Login successful",
                username,
                token,
            })
        }).catch(err => {
            console.log(err);
            res.status(400).send({
                message: "Operation failed",
                err
            })
        })
    }).catch((err) => {
        console.log(err);
        res.status(404).send({
            message: "Not exist",
            err
        })
    })
}

module.exports = controller;
