import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    },
  );
  return token;
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ msg: 'token is invalid' });
      }
      req.user = decode;
      next();
    });
  } else {
    res.status(401).send({ msg: 'token is not supplied' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    res.status(401).send('user is not valid');
  }
};

export { getToken, isAuth, isAdmin };
