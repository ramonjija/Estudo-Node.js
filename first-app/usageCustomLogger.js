const Logger = require('./logger');
const myLogger = new Logger();


myLogger.on('messageLogged', (args) => {
    console.log(args);
});

myLogger.log('My Custom Logger Test');