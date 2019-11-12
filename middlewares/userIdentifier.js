const User = require('../models/user');

const MOCK_USER = { email: 'yurets@gmail.com', password: 'qwe', name: 'Yurets' };

module.exports = async (req, res, next) => {
  if (req.session.user) {
    const user = await User.getById(req.session.user._id)
    const cart = await User.getCart(req.session.user);
    req.user = user;
    req.cart = cart;
  }
  next();
}