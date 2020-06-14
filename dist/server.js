"use strict";

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("./data"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongodburl = _config.default.MONGODB_URL;

_mongoose.default.connect(mongodburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('mongodb connected')).catch(error => console.log(error));

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use('/api/user', _userRoutes.default);
app.use('/api/products', _productRoutes.default);
app.use('/api/orders', _orderRoutes.default);
app.use(_express.default.static(_path.default.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(_path.default.join(`${__dirname}/../frontend/build/index.html`));
});
app.listen(_config.default.PORT, () => {
  console.log('Server started at http://localhost:5000');
});