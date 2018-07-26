const fs = require('fs');

fs.readdir(__dirname, function(error, files) {
    if(error) {
        console.log(error);
    } 
    else {
        files.forEach(element => {
            console.log(element);
        });
    }
});