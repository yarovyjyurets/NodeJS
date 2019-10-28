module.exports = (req, res, next) => {
  const path = req.baseUrl + req.path;
  const method = req.method;
  const body = req.body;
  console.log(`${method.toUpperCase()}: ${path}`);
  if (!(Object.entries(body).length === 0 && body.constructor === Object)) {
    console.dir(body, { colors: true, depth: 5 });
  }
  next();
}