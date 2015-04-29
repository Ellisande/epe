module.exports = function(param, details, error){
  if(details){
    return details;
  }
  if(param){
    return param;
  }
  throw error;
}
