var yargs = require('yargs');
var request = require('superagent');
var fs = require('fs');
var paramOrDetails = require('../utils/exists');
var endpoints = require('../metadata/config').endpoints();
var appDetails = require('../metadata/config').package();

module.exports.accepts = function(command){
  return command == 'cache';
}

module.exports.execute = function(){
  console.log("Updating endpoint cache.");
  var params = yargs.argv;
  var consumerName = paramOrDetails(params._[1], appDetails.name, "You must provide a name on the command line or provide it in package.json");
  var consumerVersion = paramOrDetails(params._[2], appDetails.version, "You must provide a version via the command line or it must be defined in the package.json");
  request
  .post("http://localhost:3000/endpoint/cache")
  .send({"name": consumerName, "version": consumerVersion})
  .end(function(err, res){
    var endpoints = {}
    res.body.forEach(function(contract){
      var providerString = contract.provider_name + '-' + contract.provider_version;
      endpoints[providerString] = contract;
    });
    fs.writeFile('endpoints.json', JSON.stringify(endpoints, null, 4));
    console.log('Updated ' + Object.keys(endpoints).length + ' contract(s).')
  });
}
