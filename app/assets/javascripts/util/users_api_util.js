var UsersApiUtil = {
  fetchUsers: function (successCallback, failureCallback ) {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
        successCallback && successCallback(users);
      },
      error: function (errors) {
        failureCallback && failureCallback(errors)
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
        successCallback && successCallback();
      },
      error: function (errors) {
        failureCallback && failureCallback(errors)
      }
    });
  },
  updateUser: function (user, successCallback, failureCallback) {
    $.ajax({
      url: '/api/users',
      type: 'PATCH',
      dataType: 'json',
      data: {user: user},
      success: function (user) {
        CurrentUserActions.receiveCurrentUser(user);
        successCallback && successCallback();
      },
      error: function (errors) {
        failureCallback && failureCallback(errors)
      }
    });
  }
};
