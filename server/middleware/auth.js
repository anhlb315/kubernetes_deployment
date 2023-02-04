const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, "RANDOM-TOKEN");
        console.log(verifiedToken)
        const user = verifiedToken;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({
            error: new Error("Unauthorized")
        })
    }
}

module.exports = requireAuth;
