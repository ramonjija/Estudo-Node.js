const EventEmitter = require('events');

var url = 'http://logger.io/log';

class Logger extends EventEmitter {

    log(message) {
        //send http request
        console.log(message);
        this.emit('messageLogged', {id: 1, url: url});
    }
}

module.exports = Logger;