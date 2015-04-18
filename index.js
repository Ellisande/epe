#!/usr/bin/env node
var fs = require('fs');
var http = require('http');
var request = require('superagent');
var endpoints = require('./endpoints');
var appDetails = require('./package');
var params = require('yargs')
  .usage('Usage: epm <command> [options]')
  .command('consume', 'Consume a webservice from the registry')
  .command('cache', 'Grab a local copy of your endpoints and their api keys')
  .command('provide', 'List your service as a provider')
  .demand(2)
  .argv;


var appDetails = require('./package.json');
console.log(params);
var paramKey = params._[0];
if(paramKey == 'consume'){
  var serviceToConsume = params._[1];
  var versionToConsume = params.v || 'x.x.x';
  console.log("I'm consuming!");
  request
    // .get('http://localhost:3000/some-url')
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
      console.log('I hit the service');
      var outputFilename = 'endpoints.json';
      Object.keys(res.body).forEach(function(key){
        endpoints[key] = res.body[key];
      })
      fs.writeFile(outputFilename, JSON.stringify(endpoints, null, 4));
    })
}

if(paramKey == 'cache'){
  console.log("I'm caching!");
}

if(paramKey == 'provide'){
  console.log("I'm providing!");
}
