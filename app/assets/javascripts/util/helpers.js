(function(root) {
  'use strict';
  var Helpers = window.Helpers = {
    formatDate: function (value) {
       return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear().toString().substr(2);
    }
  };
}(this));
