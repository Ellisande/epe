#!/usr/bin/env node
var yargs = require('yargs')
  .usage('Usage: epm <command> [options]')
  .command('consume', 'Consume a webservice from the registry')
  .command('cache', 'Grab a local copy of your endpoints and their api keys')
  .command('provide', 'List your service as a provider')
  .command('bump', 'Bump the current provider version and list it as consumable')
  .alias('bump-version')
  .demand(1)

var command = yargs.argv._[0];

var commands = [];
commands.push(require('./commands/consume'));
commands.push(require('./commands/cache'));
commands.push(require('./commands/remove'));
commands.push(require('./commands/provide'));
commands.push(require('./commands/bump'));

commands.some(function(currentCommand){
  if(currentCommand.accepts(command)) {
    currentCommand.execute();
    return true;
  }
});
