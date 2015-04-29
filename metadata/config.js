var fs = require('fs');

var getFileOrEmpty = function(fileName){
  try {
    var file = fs.readFileSync(fileName);
    return JSON.parse(file);
  } catch (err) {
    return {};
  }
}

module.exports.endpoints = function(){
  return getFileOrEmpty('endpoints.json');
}

module.exports.package = function(){
  return getFileOrEmpty('package.json');
}
