let chai = require('chai');
expect = chai.expect;
should = chai.should();
let request = require('request');
let config = require('../config/local');
global.domain = 'http://' + config.host + ':' + config.port;

describe('---Testing the task list api---', function() {
    it('post: Task in list', function(done) {
      var options = {
          url: domain + '/task',
          headers: {
              "Content-type" : "application/json"
          },
          json: {
            "task": "Hello world"
          }
      };
      request.post(options, function(error, response, body) {
          console.log("We Got Response", body)
          response.statusCode.should.equal(200);
          expect(body).to.be.a('array');
          expect(body).to.include(options.json.task);
          done();
      });
    });
})