const express = require('express');
const categoryController = require('../app/controllers/category')
const Authenticate = require('../middlewares/authentication')
const router = express.Router();

router.post('/create-category', Authenticate, categoryController.CreateCategory);
router.get('/get-category', categoryController.GetCategories);
router.post('/delete-category', Authenticate, categoryController.DeleteCategory);
router.post('/update-category', Authenticate, categoryController.UpdateCategories);
module.exports = router;
