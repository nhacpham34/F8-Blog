var express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

// newsController.index
router.get('/create', productController.create);
router.post('/store', productController.store);
router.post('/handle-form-actions', productController.handleFormActions);
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.delete('/:id/force', productController.forceDestroy);
router.delete('/:id', productController.destroy);
router.patch('/:id/restore', productController.restore);
router.get('/:slug', productController.show);
router.get('/', productController.homeProducts);
module.exports = router;