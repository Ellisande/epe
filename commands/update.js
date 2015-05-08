var appDetails = localRequire('metadata/config').package();
var request = require('superagent');
var endpoints = localRequire('metadata/config').endpoints();


var accepts = function(command){
  return command == 'update' || command == 'up';
};

var updateEndpoint = function(){
  var providerVersion = appDetails.version;
  var providerName = appDetails.name;
  var args = require('yargs')
    .demand(1)
    .usage('epe update [endpoint]')
    .option('pn', {
      alias: 'provider-name',
      demand: false,
      default: providerName,
      describe: 'The name of the providing application you wish to update and endpoint for',
      type: 'string'
    })
    .option('pv', {
      alias: 'provider-version',
      demand: false,
      default: providerVersion,
      describe: 'The version of the providing application to update.',
      type: 'string'
    })
    .option('t', {
      alias: 'tag',
      demand: false,
      describe: 'Tag for the new endpoint',
      type: 'string'
    })
    .argv;
  var endpoint = args._[1];
  var name = args.pn;
  var version = args.pv;
  var input = {
    name: args.pn,
    version: args.pv,
    endpoint: endpoint
  }
  if(args.tag){
    input.tag = args.tag;
  }
  request
    .post('http://localhost:3000/endpoint/update')
    .send(input)
    .end(function(err, res){
      var tagName = input.tag || 'default';
      console.log('Endpoint updated: ' + tagName + ':' + endpoint);
    });
};

module.exports = {
  accepts: accepts,
  execute: updateEndpoint
}
