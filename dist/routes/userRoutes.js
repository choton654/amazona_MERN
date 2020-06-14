"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _utlis = require("../utlis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.put('/:id', _utlis.isAuth, async (req, res) => {
  try {
    const user = await _userModel.default.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      });
    } else {
      res.status(400).send({
        msg: 'user not found'
      });
    }
  } catch (error) {
    res.status(500).send({
      msg: 'server error'
    });
  }
});
router.post('/signin', async (req, res) => {
  const signInUser = await _userModel.default.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (signInUser) {
    res.send({
      _id: signInUser.id,
      name: signInUser.name,
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
      token: (0, _utlis.getToken)(signInUser)
    });
  } else {
    res.status(401).send({
      msg: 'invalid email or password'
    });
  }
});
router.post('/register', async (req, res) => {
  const user = new _userModel.default({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: (0, _utlis.getToken)(newUser)
    });
  } else {
    res.status(401).send({
      msg: 'invalid user'
    });
  }
});
router.get('/createadmin', async (req, res) => {
  try {
    const user = new _userModel.default({
      name: 'choton',
      email: 'choton654@gmail.com',
      password: '12345',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({
      msg: error.message
    });
  }
});
var _default = router;
exports.default = _default;