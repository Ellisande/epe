var yargs = require('yargs');
var fs = require('fs');
var semver = require('semver');
var paramOrDetails = require('../utils/exists');
var appDetails = require('../metadata/config').package();
var provide = require('./provide').execute;

module.exports.accepts = function(command){
  return command == 'bump' || command == 'bump-version';
}

module.exports.execute = function(){
  console.log("I'm bumping");
  if(!appDetails || !appDetails.version){
    throw "No version was present in package.json. One must exist to use the bump option. Try using update with the -v arg if you aren't using a package.json";
  }
  var params = yargs.argv;
  var bumpType = params._[1] || 'patch';
  if(bumpType == 'major'){
    yargs
      .usage('epm bump major [endpoint]')
      .demand(2, 'When bumping a major version an endpoint is required. Endpoints cannot be automatically be carried forward for major versions')
      .argv;
  }
  var outputFilename = 'package.json';
  appDetails.version = semver.inc(appDetails.version, bumpType);
  fs.writeFileSync(outputFilename, JSON.stringify(appDetails, null, 4));
  provide();
}
