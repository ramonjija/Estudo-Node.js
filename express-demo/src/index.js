const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { 
        id: 1,
        name: "course 1"
    },
    { 
        id: 2,
        name: "course 2"
    },
    { 
        id: 3,
        name: "course 3"
    }
]

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    let { error } = validateCourses(req.body);
    if(error) 
        return res.status(400).send(error.details[0].message);
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let course = courses.find(c => c.id === id);
    if(!course) 
        return res.status(404).send('The course with the given id was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    
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

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
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

//Query Parameters
app.get('/api/posts/:year/:month', (req, res) => {
    let year = req.params.year;
    let month = req.params.month;
    //res.send(req.params);
    //query
    res.send(req.query)
});

//PORT
const port = process.env.PORT || 8084;
app.listen(port, () => {
    console.log(`Listening on port ${port}!!`);
});