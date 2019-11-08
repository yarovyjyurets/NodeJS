module.exports = (req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Not found',
    path: '/404',
    isAuthenticated: req.session.isAuthenticated
  })
}