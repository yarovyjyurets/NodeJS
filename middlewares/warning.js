
module.exports = async (req, res, next) => {
  const msg = req.flash('warn')[0];
  res.locals.warningMessage = msg || null;
  next();
}