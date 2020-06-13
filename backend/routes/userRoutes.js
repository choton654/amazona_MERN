import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../utlis';

const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(400).send({ msg: 'user not found' });
    }
  } catch (error) {
    res.status(500).send({ msg: 'server error' });
  }
});

router.post('/signin', async (req, res) => {
  const signInUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signInUser) {
    res.send({
      _id: signInUser.id,
      name: signInUser.name,
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
      token: getToken(signInUser),
    });
  } else {
    res.status(401).send({ msg: 'invalid email or password' });
  }
});

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: 'invalid user' });
  }
});

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'choton',
      email: 'choton654@gmail.com',
      password: '12345',
      isAdmin: true,
    });
    const newUser = await user.save();

    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
