const { body, check, validationResult } = require("express-validator");
const UsersCollection = require("../models/UsersSchema");

let validationMiddlewares = [
  body("firstName")
    .isLength({ min: 5, max: 20 }) //body("firstname").isLength({min:5})==> i want to control this condition
    .withMessage("please firstname shouldn't be less than 5 chars long")
    .trim(), //trim is sanitisation.(do this)
  check("lastName", "please enter something as lastname").not().isEmpty(),
  body("email")
    .isEmail()
    .withMessage("please provide a valid email address")
    .toLowerCase() //toLowerCase()==>sanitisation==> change the value
    .custom((value) => {
      //we can create custom sanitisation
      return UsersCollection.findOne({ email: value }).then((user) => {
        //if there is same email send error
        if (user) {
          return Promise.reject("Email already exist"); //it is an error message
        }
        return true;
      });
    }),
  body("password", "please dont use common words as password")
    .not()
    .isIn(["1234", "abcd", "hello"])
    .customSanitizer((value) => {
      return value;
    }),
  //custom validator
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //if error is empty (if there is no error)
      next();
    } else {
      let message = errors.array().reduce((acc, item) => {
        acc[item.param] = item.msg; //inside the error there is some message
        return acc;
      }, {});

      next({ status: 401, message: message });
      /*
      "success": false,
    "message": {
        "firstName": "please firstname shouldn't be less than 5 chars long",
        "lastName": "please enter something as lastname",
        "email": "Email already exist",
        "password": "please dont use common words as password"
    }
}
      */
    }
  },
];

module.exports = validationMiddlewares;
