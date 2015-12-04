// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  if(typeof obj === 'string'){
    return '"' + obj + '"';
  }

  else if(typeof obj === 'number'){
    return obj.toString();
  }

  else if(typeof obj === 'boolean'){
    return obj.toString();
  }

  else if(typeof obj === 'function'){
    return null;
  }

  else if(obj === null){
    return "null";
  }

  else if(obj === undefined){
    return null;
  }

  else if(Array.isArray(obj)){
    return '[' +
      obj.map(function(item) {
        return stringifyJSON(item)
      }).join(",") + ']';
  }

  else if((!!obj) && (obj.constructor === Object)){
    var result = [];
    var objKeys = Object.keys(obj);
    objKeys.forEach(function(key){
      var val = stringifyJSON(obj[key]);
      if(val !== null){
        result.push('"' + key + '":' + val);
      }
    });
    return '{' + result.join(',') + '}';
  }

};
