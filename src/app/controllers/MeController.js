const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../until/mongoose')
class MeController {
    // [GET]    /me/stored/products
    storedProducts(req, res ,next) {
        let productQuery = Product.find({})
        if (req.query.hasOwnProperty('_sort')) {
            productQuery = productQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([productQuery, Product.countDocumentsDeleted()])
            .then(([products , deletedCount]) => res.render('me/stored-products', {
                deletedCount,
                products: mutipleMongooseToObject(products) 
                }))
    }

    // [GET] /me/trash/products
    trashProducts(req, res, next){
        Product.findDeleted({})
            .then( products => res.render('me/trash-products', {
                products: mutipleMongooseToObject(products) 
                }))
            .catch(next)
    }
}
module.exports = new MeController();
