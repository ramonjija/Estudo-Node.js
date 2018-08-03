const Joi = require('joi');
const express = require('express');
const router = express.Router();

var genres = [];

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    let { error } = validateGenres(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    let genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    let { error } = validateGenres(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    let id = parseInt(req.params.id);

    let genre = genres.find(c => c.id === id);

    if(!genre)
        return res.status(404).send('the genre with the given id was not found');
    
        genre.name = req.body.name;

    res.send(genre);

});

router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);

    let genre = genres.find(c => c.id === id);

    if(!genre)
        return res.status(404).send('the genre with the given id was not found');
    
    let index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});


function validateGenres(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;