var paramOrDetails = require('../utils/exists');
var endpoints = require('../metadata/config').endpoints();
var appDetails = require('../metadata/config').package();
var yargs = require('yargs');
var request = require('superagent');
var fs = require('fs');
var endpointsFileName = requireLocal('config').endpointsFileName;

module.exports.accepts = function(command){
  return command == 'consume';
}

module.exports.execute = function(){
  var params = yargs.demand(1, "You must provide the name of the service you wish to consumer").argv;
  var serviceToConsume = params._[1];
  var versionToConsume = params._[2] || 'x.x.x';
  var consumerVersion = paramOrDetails(params.cv, appDetails.version, "No consumer version defined. Add a version to package.json or provide it with -cv arg.");
  var consumerName = paramOrDetails(params.cn, appDetails.name, "No consumer name was defined. Add a name to package.json or provide it with the -cn arg.");
  request
    .post('http://localhost:3000/contract/add')
    .send({
      "provider": {
          "name": serviceToConsume,
          "version": versionToConsume
      },
      "consumer": {
          "version": appDetails.version,
          "name": appDetails.name
      }
    })
    .end(function(err, res){
      var outputFilename = endpointsFileName;
      var newContracts = res.body;
      Object.keys(newContracts).forEach(function(key){
        endpoints[key] = res.body[key];
        console.log('Added a new contract for ' + res.body[key].provider_name + '-' + res.body[key].provider_version);
      })
      fs.writeFile(outputFilename, JSON.stringify(endpoints, null, 4));
    })
}
