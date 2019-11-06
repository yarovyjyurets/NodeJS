const User = require('../models/user');

const MOCK_USER = { email: 'yurets@gmail.com', password: 'qwe', name: 'Yurets' };

module.exports = async (req, res, next) => {
  const dummyUserId = process.env.DB === 'SQL' ? 1 : '5dc1760eb0001a4b42dcb948';
  const dummyUser = await User.getById(dummyUserId);

  if (dummyUser) {
    const cart = await User.getCart(dummyUser);
    req.user = dummyUser;
    req.cart = cart;
  } else {
    const createdUser = await User.create(MOCK_USER);
    const createdCart = await User.createCart(createdUser.ops && createdUser.ops[0] || createdUser);
    req.user = createdUser;
    req.cart = createdCart;
  }

  next();
}