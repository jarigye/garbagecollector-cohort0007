const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration')

// specify what to do when user hit the '/'(home page) route/endpoint
router.get('/', (req, res) => {
    res.render('registerFrontDesk', { title: 'Registration form' })
})

router.post('/', (req, res) => {
    console.log(req.body);
    const registration = new Registration(req.body);
    registration.save()
        .then(() => { res.redirect('/login') })
        .catch((err) => {
            console.log(err);
            res.send('Sorry! Something went wrong.');
        });
})

module.exports = router;