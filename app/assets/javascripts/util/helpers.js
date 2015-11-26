(function(root) {
  'use strict';
  var Helpers = window.Helpers = {
    formatDate: function (value) {
       return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear().toString().substr(2);
    },
    sortBy: function (property, order) {
      return function (a, b) {
          var x = -1, y = 1;
          order = order || "";
        if (order.toLowerCase() === "desc"){
           x = 1; y = -1;
        }
          if (a[property] < b[property])
            return x;
          if (a[property] > b[property])
            return y;
          return 0;

      };
    },

  };
}(this));
