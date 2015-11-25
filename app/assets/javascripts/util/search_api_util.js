(function(root) {
  'use strict';
  var SearchAPIUtil = root.SearchAPIUtil = {
    search: function (query, callback) {
      $.ajax({
        url: '/api/search',
        method: 'GET',
        dataType: 'json',
        data: {query: query},
        success: function (data) {
          callback && callback(data);
        }
      });
    },
  };
}(this));
