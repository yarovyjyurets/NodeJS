module.exports = (err, req, res, next) => {
  if (err.error) {
    if (err.error.isJoi) {
      req.flash('warn', err.error.toString());
    }
    if (err.error.type === 'ValidationError') {
      req.flash('warn', err.error.message);
    }
    return res.status(400).redirect('/signup');
  } else {
    next(err);
  }
};