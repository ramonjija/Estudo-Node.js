let express = require('express');
let bodyParser = require('body-parser');
let _ = require('lodash');
let config = require('../config/local')
let app = express();

app.use(bodyParser.json());
app.listen(process.env.PORT || config.port);

let taskList = [];

app.get('/list', function(req, res) {
    res.send(taskList);
});

app.post('/task', [validationMiddleware, function(req, res) {
    let task = req.body.task;
    taskList.push(task);
    res.send(taskList);
}]);

app.put('/task/:task_index', [validationMiddleware, function(req, res) {
    let taskIndex = req.params.task_index;
    taskList[taskIndex] = req.body.task;
    res.send(taskList);
}]);

app.delete('/task/:task_index', function(req, res) {
    let taskIndex = req.params.task_index;
    taskList.splice(taskIndex, 1);
    res.send(taskList);
});

function validationMiddleware(req, res, next) {
    if(_.isEmpty(req.body.task)) {
        return res.status(422).send("Task is empty");
    }
    return next();
}