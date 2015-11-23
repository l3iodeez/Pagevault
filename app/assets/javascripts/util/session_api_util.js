var SessionsApiUtil = {
  login: function (credentials, successCallback, failureCallback) {
    debugger
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        console.log("logged in!");
        CurrentUserActions.receiveCurrentUser(currentUser);
        successCallback && successCallback();
      },
      error: function (errors) {
        debugger
        console.log("login failure!");
        failureCallback && failureCallback(errors)
      }
    });
  },

  logout: function () {
    $.ajax({
      url: '/api/session',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        console.log("logged out!");
        CurrentUserActions.receiveCurrentUser({});
        SelectedActions.setSelected(null);
        ApiActions.receiveAllNotes([]);
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
      }
    });
  }


};
