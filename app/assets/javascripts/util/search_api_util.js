(function(root) {
  'use strict';
  var SearchAPIUtil = root.SearchAPIUtil = {
    search: function (callback) {
      $.ajax({
        url: '/api/search',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          callback && callback(data);
        }
      });
    },
  };
}(this));
