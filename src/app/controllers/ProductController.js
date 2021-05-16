const Product = require('../models/Product')

const { mongooseToObject, mutipleMongooseToObject } = require('../../until/mongoose')
class ProductController {
    // [GET] /product/:slug
    show(req, res, next) {
        Product.findOne({slug: req.params.slug})
        .then( product => {
            res.render('product/show', { product: mongooseToObject(product) })
        })
        .catch(next)
    }
    // [GET] /product/create
    create(req, res, next) {
        res.render('product/create')
    }
    // [GET] /product/store
    store(req, res, next) {
        // res.json(req.body)
        const product = new Product(req.body)
        product.save()
            .then( () => res.redirect('/me/stored/products'))
            .catch(error => {

            })
    }

    // [GET] /product/:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then( (product) =>res.render('product/edit', {
                 product: mongooseToObject(product)
                }))
            .catch(next)
        
    }
    // [GET] /product/
    homeProducts(req, res, next) {
        Product.find({})
            .then(product => {
                res.render('home', { product : mutipleMongooseToObject(product) })
            })
            .catch(next);
    }
    // [PUT] /product/:id
    update(req, res, next) {
        Product.updateOne( {_id: req.params.id}, req.body)
            .then( () => res.redirect('/me/stored/products'))
            .catch(next)
    }

    // [DELETE] /product/:id
    destroy(req, res, next){
        Product.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [DELETE] /product/:id/force
    forceDestroy(req, res, next){
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [PATCH] /product/:id/restore
    restore(req, res, next){
        Product.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [POST] /products/handle-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action) {
            case 'delete':
                Product.delete({_id: {$in: req.body.productIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'restore':
                Product.restore({_id: {$in: req.body.productIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            
            case 'deleteOld':
                Product.remove({_id: {$in: req.body.productIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)

                break;
            default:
                res.json({mesage: 'Action is invalid!'})
        }
    }
}
module.exports = new ProductController();
