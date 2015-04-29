var yargs = require('yargs');
var request = require('superagent');
var paramOrDetails = require('../utils/exists');

module.exports.accepts = function(command){
  return command == 'provide';
}

module.exports.execute = function(){
  //TODO: refactor to handle the inputs better.
  var appDetails = require('../metadata/config').package();
  var params = yargs.argv;
  var requestedEndpoint = params._[1];
  var newEndpoint;
  if(requestedEndpoint){
    newEndpoint = {
      default: requestedEndpoint
    }
  }
  var app = {
    name: appDetails.name,
    version: appDetails.version,
  }
  if(newEndpoint){
    app.endpoints = newEndpoint;
  }
  request
    .post('http://localhost:3000/version/update')
    .send(app)
    .end(function(err, res){
      console.log('Now providing ' + appDetails.name + '-' + appDetails.version + ' in the exchange.');
    });
}
