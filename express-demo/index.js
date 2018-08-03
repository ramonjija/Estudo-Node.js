const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middlewares/logger')
const auth = require('./middlewares/auth');
const express = require('express');
const app = express();

//Engines
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('../public'));
app.use(helmet());

console.log(`Application name ${config.get('name')}`);
console.log(`Mail Host ${config.get('mail.host')}`);
console.log(`Mail Password ${config.get('mail.password')}`);


if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    //Deve-se setar a variavel de ambiente set DEBUG=app.* para funcionar
    startupDebugger('Morgan enabled...');
}
app.use(logger);
app.use(auth);

dbDebugger('Logging database stuff');

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
   res.render('index', {title: 'My Express App', message: 'Hellooooo @_@'})
});

app.get('/api/courses', (req, res) => {
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