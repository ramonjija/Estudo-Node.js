const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middlewares/logger')
const courses = require('./routes/courses');
const home = require('./routes/home');
const auth = require('./middlewares/auth');
const express = require('express');
const app = express();

//Engines
app.set('view engine', 'pug');
app.set('views', './views');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('../public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);


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