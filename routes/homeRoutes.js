const express = require('express');
const router = express.Router();

// specify what to do when user hit the '/'(home page) route/endpoint
router.get('/', (req, res) => {
    res.render('homepage', { title: 'Home page' })
})

module.exports = router;