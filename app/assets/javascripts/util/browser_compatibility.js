(function(root) {
  'use strict';
  if (typeof Array.find === "undefined") {
    Array.prototype.find = function (callback) {
      var array = this.slice(0);
      for (var i = 0; i < array.length; i++) {
        if (callback(array[i])) {
          return array[i];
        }
      }
    };
  }

  
}(this));
