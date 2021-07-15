const express = require('express');
const router = express.Router();
const passport = require('passport');

// gets and displays a login page
router.get('/', (req, res) => {
    res.render('login', { title: 'Login form' })
})

router.post('/', (req,res) =>{
    res.redirect('/employee');
})
module.exports = router;