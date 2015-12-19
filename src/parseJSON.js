// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  var at; // setting current index number of json text
  var ch; // setting character at current index

  var escapees = {
             '\\"':  '"',
             '\\\\': '\\',
             '/':  '/',
             '\\b':    '\b',
             '\\f':    '\f',
             '\\n':    '\n',
             '\\r':    '\r',
             '\\t':    '\t'
  };

  var next = function(){
    at+= 1;
    ch = json.charAt(at);
    console.log('current ch is equal to: ' + ch);

    if(ch && (ch === ',' || ch <= ' ')){

      next();
    }
    return ch;
  }

  var nextString = function(){
    at+= 1;
    ch = json.charAt(at);
    console.log('current ch is equal to: ' + ch);
    return ch;
  };


  var error = function(message){
    throw new SyntaxError(message);
  };

  var string = function(){
    var result = '';
    nextString();
    while(ch){

      if(ch === '"'){
        next();
        console.log('this is the string: ' + result);
        return result;
      }

      if(ch === '\\'){
        nextString();

        if(escapees.hasOwnProperty(ch)){
          result+=escapees[ch];
        }
      }

      result+=ch;
      nextString();
    }
  };

  var number = function(){
    var result;
    var digits = '';

    if(ch === '-'){
      digits = '-';
      nextString();
    }

/*    digits += ch;
    next();*/
    while(ch >= 0 && ch <= 9){
        digits += ch;
        nextString();
    }

    if(ch === '.'){
      digits+= '.';
      next();
      while(ch >= 0 && ch <= 9){
        digits+=ch;
        nextString();
      }
    }

    result = Number(digits);

    if(isNaN(result)){
      return error('NaN is not a proper number');
    }

    else {
      console.log('hello result');
      if(ch === ','){
        next();
      }
      return result;
    }

  };

  var array = function(){
    var arr = [];
    var val;
    if(ch === '['){
      console.log('opening array bracket');
      next();
      console.log('current ch is: ' + ch);

      if(ch === ']'){
        console.log('empty array');
        next();
        return arr;
      }

      while(ch){
        console.log('this ch is getting tested in value: ' + ch);
        val = value();
        console.log('this is the value: ' + val);
        arr.push(val);
        console.log(arr);
        if(ch === ','){
          next();
        }
        //next();
        if(ch === ']'){
          next();
          console.log('closing array bracket');
          return arr;
        }
      }
    }
    return error('this is not a valid array');
};


  var object = function(){
    var key;
    //var prop;
    var obj = {};
    if(ch === '{'){
      console.log('beginning of object');
      next();

      if(ch === '}'){
        console.log('empty object');
        next();
        return obj;
      }

      while(ch){
        key = string();
        next();
        obj[key] = value();
        console.log('current key: ' + key);
        console.log('current value: ' + obj[key]);

        if (ch === '}'){
          console.log('the closing curly brace');
          next();
          return obj;
        }
      }
    }
  };

  var isBool = function(){
    var bool = '';
    if(ch === 't'){
      bool+=ch;
      next();
      bool+=ch;
      next();
      bool+=ch;
      next();
      bool+=ch;

      if(bool === 'true'){
        next();
        return true;
      }

      else {
        return error('this is not a true boolean');
      }

    }

    else if(ch === 'f'){
      bool+=ch;
      next();
      bool+=ch;
      next();
      bool+=ch;
      next();
      bool+=ch;
      next();
      bool+=ch;

      if(bool === 'false'){
        next();
        return false;
      }

      else {
        return error('this is not a false boolean');
      }
    }

    else {
      return error('This is not a boolean');
    }

  };

  var isNull = function(){
    var nully = '';
    if(ch === 'n'){
      nully+=ch;
      next();
      nully+=ch;
      next();
      nully+=ch;next();
      nully+=ch;

      if(nully === 'null'){
        next();
        return null;
      }

      else {
        return error('this is not a null value');
      }

    }
    else {
      return error('this is not a null value');
    }
  };


  var value = function(){

    if(ch === '"'){
      console.log('string!');
      return string();
    }

    else if(ch === '-' || (ch >= '0' && ch <= '9')){
      console.log('number!');
      return number();
    }

    else if(ch === '['){
      console.log('array');
      return array();
    }

    else if(ch === '{'){
      console.log('object');
      return object();
    }

    else if(ch === 't' || ch === 'f'){
      console.log('boolean!');
      return isBool();
    }

    else if(ch === 'n'){
      console.log('null!');
      return isNull();
    }

  };

  at = 0;
  ch = json.charAt(at);
  return value();

};
