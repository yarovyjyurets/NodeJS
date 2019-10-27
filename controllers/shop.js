const getHomePage = (req, res) => {
  console.log('<getHomePage>');
  return res.render('shop/home.ejs', {
    pageTitle: 'Home page',
    products: [],
    path: req.url
  })
};

module.exports = {
  getHomePage
};