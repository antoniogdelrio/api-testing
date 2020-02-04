const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', userController.get_users);

router.get('/:id', userController.get_one_user);

router.post('/', userController.post_user);

module.exports = router;