(function(root) {
  'use strict';
  var ApiUtil = root.ApiUtil = {
    fetchNotes: function () {
      $.ajax({
        url: '/api/notes',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          ApiActions.receiveAllNotes(data);
        }
      });
    },
    createNote: function (note) {
      $.ajax({
        url: '/api/notes',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({note: note}),
        success: function (data) {
          ApiActions.receiveSingleNote(data);
        }
      });
    }
  };
}(this));
