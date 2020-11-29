const jwt = require('jsonwebtoken');
const rt = require("./Kemy");
module.exports = {
    checkToken: (req, res, next)=> {
        let authorize_token = req.get("token_nails");
        let jwt_token = "";
        if (authorize_token === undefined) {
            res.status(401);
            res.send("JWT Token cloes not exist!");
            return;
        } else if (authorize_token.startsWith("")) {
            jwt_token = authorize_token.substring();
        } else {
            res.status(401);
            res.send("JWT Token cloes not begin with bearer!");
            return;
        }
        try {
            let payload = jwt.verify(jwt_token, rt.KEY);
            if (payload["type"] != 'access')
                throw 'invalis JWT token';
            req.token = jwt_token;
            req.
            next();
        } catch (e) {
            console.error("Invalis JWT Token")
            res.status(401);
            res.send("Invalis JWT Token");
        }
    }
}


