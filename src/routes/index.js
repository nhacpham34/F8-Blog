const newsRouter = require('./new');
const productRouter = require('./products');
const meRouter = require('./me');

const siteRouter = require('./site');

function routes(app) {
    app.use('/new', newsRouter);
    app.use('/me', meRouter);
    app.use('/product', productRouter);
    app.use('/', siteRouter);
}

module.exports = routes;
