var fs = require('fs');
var findParent = require('find-parent-dir');
var path = require('path');

var getFileOrEmpty = function(fileName){
  try {
    var dir = findDir(fileName);
    var file = fs.readFileSync(dir + '/' + fileName);
    return JSON.parse(file);
  } catch (err) {
    console.log(err);
    return {};
  }
}

var findDir = function(fileName){
  return findParent.sync(process.cwd(), fileName);
}

module.exports.endpoints = function(){
  return getFileOrEmpty('endpoints.json');
}

module.exports.package = function(){
  return getFileOrEmpty('package.json');
}

module.exports.endpointsFileName = function(){
  return findDir('endpoints.json') + '/endpoints.json';
}();

module.exports.packageFileName = function(){
  return findDir('package.json')+'/package.json';
}();
