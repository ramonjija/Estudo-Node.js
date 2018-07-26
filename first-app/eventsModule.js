const EventEmitter = require('events');
const emmiter = new EventEmitter();

//Register a Listener

emmiter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

//Raise a event
//With event arguments
emmiter.emit('messageLogged', {id: 1, url:'http://'});

//Raise: Logging (data: message)


emmiter.on('loggin', (arg) => {
    console.log('Event Loggin Raised: ', arg)
});

emmiter.emit('loggin', { data: 'Mensagem enviada' });

const log = require('./logger');
log('message');
