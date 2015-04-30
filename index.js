#!/usr/bin/env node
global.localRequire = function(moduleName){
  return require(__dirname + "/" + moduleName);
}
var yargs = require('yargs')
  .usage('Usage: epm <command>')
  .command('consume', 'Consume a webservice from the registry')
  .command('cache', 'Grab a local copy of your endpoints and their api keys')
  .command('provide', 'List your service as a provider')
  .command('bump', 'Bump the current provider version and list it as consumable')
  .alias('bump-version')
  .demand(1)

var command = yargs.argv._[0];

var commands = [];
commands.push(localRequire('commands/consume'));
commands.push(localRequire('commands/cache'));
commands.push(localRequire('commands/remove'));
commands.push(localRequire('commands/provide'));
commands.push(localRequire('commands/bump'));

commands.some(function(currentCommand){
  if(currentCommand.accepts(command)) {
    currentCommand.execute();
    return true;
  }
});
