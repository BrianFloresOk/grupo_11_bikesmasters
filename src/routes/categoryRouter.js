const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();
const productController = require('../controllers/categoryController');
const CategoriValidation = require('../validations/CategoriValidation')

/*** GET ONE CATEGORY ***/ 
router.get('/categoria/:id', categoryController.Category); 


module.exports = router