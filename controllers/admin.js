const addProduct = (req, res) => {
  console.log('<addProduct>');
  return res.render('admin/add-product.ejs', {
    pageTitle: 'Add product',
    products: [],
    path: req.url
  })
}

module.exports = {
  views: {
    addProduct
  }
}