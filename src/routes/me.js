var express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

// newsController.index
router.get('/stored/products', meController.storedProducts);
router.get('/trash/products', meController.trashProducts);
module.exports = router;