(function(root) {
  'use strict';
  var SearchAPIUtil = root.SearchAPIUtil = {
    search: function (query, callback, model) {
      model = model || "Note";
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
