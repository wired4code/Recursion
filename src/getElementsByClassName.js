// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){

  var results = [];
  var domTraverse = function(element, func){
    func(element);
    var children = element.childNodes;
    if(children){
      for(var i = 0; i < children.length; i++){
        domTraverse(children[i], func);
      }
    }
  };

  domTraverse(document.body, function(node){
    var classes = node.classList;
    if(classes){
      for(var i = 0; i < classes.length; i++){
        if(classes[i] === className){
          results.push(node);
        }
      }
    }
  });
  return results;
};