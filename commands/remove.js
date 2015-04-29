var yargs = require('yargs');
var request = require('superagent');
var fs = require('fs');
var paramOrDetails = require('../utils/exists');
var endpoints = require('../metadata/config').endpoints();
var appDetails = require('../metadata/config').package();

module.exports.accepts = function(command){
  return command == 'remove';
}

module.exports.execute = function(){
  console.log("I'm removing");
  var params = yargs
    .usage("epm remove [name] [version]")
    .demand(2)
    .argv._;
  var providerVersion = params[2];
  var providerName = params[1];
  var consumerName = paramOrDetails(params.cn, appDetails.name, "You must either provide a name with the -cn flag or have a name in your package.json");
  var consumerVersion = paramOrDetails(params.cv, appDetails.version, "You must either provide a version with the -cv flag or have a version in your package.json");
  var app = {
    provider: {
      version: providerVersion,
      name: providerName
    },
    consumer: {
      name: consumerName,
      version: consumerVersion
    }
  };
  request
    .post('http://localhost:3000/contract/remove')
    .send(app)
    .end(function(err, res){
      if(err){
        return console.log('No contracts removed.');
      }
      res.body.forEach(function(contract){
        console.log('Contract removed for ' + contract.provider_name + '-' + contract.provider_version);
      })
    });
  //TODO: after removing update the endpoints.json
}
