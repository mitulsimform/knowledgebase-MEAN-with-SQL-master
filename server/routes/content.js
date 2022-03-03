const express = require('express');
const contentController = require('../app/controllers/content')
const Authenticate = require('../middlewares/authentication')
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});
const multipleUpload = multer({ storage: storage }).array('file');
router.post('/create-content', Authenticate, multipleUpload, contentController.CreateContent);
router.get('/get-content', Authenticate, contentController.GetContent);
router.get('/get-content-by-id', Authenticate, contentController.GetContentById);
router.post('/delete-content', Authenticate, contentController.DeleteContent);
// router.post('/update-content', Authenticate, categoryController.UpdateCategories);
module.exports = router;
