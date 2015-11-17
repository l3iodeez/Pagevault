(function(root) {
  'use strict';
  var ApiUtil = root.ApiUtil = {
    signIn: function (username, password) {
      $.ajax({
        url: '/api/benches',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({username: username, password: password}),
        success: function (data) {
          debugger
          ApiActions.receiveSingle(data);
        }
      });
    }
  };
}(this));
