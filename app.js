const express = require('express');
const app = express();
const constants = require('./core/constants');
const port = process.env.PORT || constants.PORT;
const bodyParser = require('body-parser')

const shopRouter = require('./routers/shop');
const adminRouter = require('./routers/admins');

app.set('x-powered-by', false);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(shopRouter);
app.use('/admin', adminRouter);
app.use((req, res, next) => {
  res.status(404).sendFile('views/404.html', { root: process.cwd() });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));