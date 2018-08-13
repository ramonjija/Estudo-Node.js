const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'English Motherfucker DO YOU SPEAK IT!? @_@'})
 });

 module.exports = router;