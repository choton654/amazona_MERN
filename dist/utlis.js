"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isAuth = exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getToken = user => {
  const token = _jsonwebtoken.default.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, _config.default.JWT_SECRET, {
    expiresIn: '48h'
  });

  return token;
};

exports.getToken = getToken;

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);

    _jsonwebtoken.default.verify(onlyToken, _config.default.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({
          msg: 'token is invalid'
        });
      }

      req.user = decode;
      next();
    });
  } else {
    res.status(401).send({
      msg: 'token is not supplied'
    });
  }
};

exports.isAuth = isAuth;

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    res.status(401).send('user is not valid');
  }
};

exports.isAdmin = isAdmin;