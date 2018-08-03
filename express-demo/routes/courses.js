const express = require('express');
const Joi = require('joi');

const router = express.Router();

const courses = [
    {   id: 1, name: "course 1"    },
    {   id: 2, name: "course 2"    },
    {   id: 3, name: "course 3"    }
]

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let course = courses.find(c => c.id === id);
    if(!course) 
        return res.status(404).send('The course with the given id was not found');
    res.send(course);
});

router.post('/', (req, res) => {
    
    let { error } = validateCourses(req.body);
    if(error) 
        return res.status(400).send(error.details[0].message);
       
    let course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let course = courses.find(c => c.id === id);

    let { error } = validateCourses(req.body);
    if(error) 
        return res.status(400).send(result.error.details[0].message);
    
    if(!course) 
        return res.status(404).send('The course with the given id was not found');

    course.name = req.body.name;
    res.send(course);
    
});

router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let course = courses.find(c => c.id === id);

    if(!course) 
        return res.status(404).send('The course with the given id was not found');

    let index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourses(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

module.exports = router;