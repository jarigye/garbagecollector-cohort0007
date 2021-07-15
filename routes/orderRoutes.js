const express = require('express');
const router = express.Router();
const passport = require('passport');

// gets and displays a login page
router.get('/', (req, res) => {
    res.render('orderlist', { title: 'Order List' })
})
router.get('/createOrder', (req, res) => {
    res.render('createOrder', { title: 'Create Order' })
})

module.exports = router;