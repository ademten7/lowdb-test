const jwt = require("jsonwebtoken");
const UsersCollection = require("../models/UsersSchema");

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    //verify token
    let decode = jwt.verify(token, "secret-code"); //verify that token and secret key is correct
    if (decode) {
      //payload
      // console.log(decode);
      //   {
      //     email: 'sinem@hotmail.com',
      //     id: '61dd41f1e9e65d589117a9da',
      //     iat: 1641908919,
      //     exp: 1641912519,
      //     aud: 'fbw-e04-2',
      //     iss: 'Naqvi'
      //   }
      const user = await UsersCollection.findById(decode.id);
      req.user = user;
      req.token = token;
      next(); //forwarding the request
    } else {
      next({ message: "invalid token" }); //forwarding req along with error
    }
  } catch (err) {
    next(err); //forwarding req along with error
  }
};

module.exports = authentication;
