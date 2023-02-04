const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { createUser } = require('../db/api/User/mutations');

const controller = (req, res, next) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hashed) => {
        createUser({
            username,
            password: hashed
        }).then((result) => {
            res.status(201).send({
                message: "User created",
                result,
            });
        }).catch((err) => {
            console.log(err);
            res.status(400).send({
                message: "Operation failed",
                err,
            })
        });
    }).catch((err) => {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err,
        })
    })
}

module.exports = controller;
