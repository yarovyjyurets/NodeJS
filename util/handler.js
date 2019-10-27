module.exports = (handler) =>
  (req, res, next) =>
    Promise.resolve()
      .then(() => handler(req, res, next))
      .catch((e) => {
        console.log('!$@#%@#$ERROR', e)
        next(e)
      });