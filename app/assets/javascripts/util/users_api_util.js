var UsersApiUtil = {
  fetchUsers: function () {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
        UserActions.receiveUsers(users);
      }
    });
  },

  fetchUser: function (id) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        UserActions.receiveUser(user);
      }
    });
  },

  createUser: function (attrs, successCallback, failureCallback) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: attrs,
      success: function (user) {
        // UserActions.receiveUser(user);

        successCallback && successCallback();
      },
      error: function (errors) {
        failureCallback && failureCallback(errors)
      }
    });
  }
};
