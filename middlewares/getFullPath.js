module.exports = (req, res, next) => {
  req.fullPath = req.originalUrl.replace(/\?.*$/, '');
  next();
}