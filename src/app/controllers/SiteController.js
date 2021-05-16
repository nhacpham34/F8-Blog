const Product = require('../models/Product')

const { mutipleMongooseToObject } = require('../../until/mongoose')
class SiteController {

    search(req, res) {
        res.render('search');
    }

    home(req, res, next) {
        Product.find({})
            .then(product => {
                res.render('home', { product : mutipleMongooseToObject(product) })
            })
            .catch(next);
    }
}
module.exports = new SiteController();
