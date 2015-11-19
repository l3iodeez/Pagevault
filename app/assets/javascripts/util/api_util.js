(function(root) {
  'use strict';
  var ApiUtil = root.ApiUtil = {
    fetchAllNotes: function (callback) {
      $.ajax({
        url: '/api/notes',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          ApiActions.receiveAllNotes(data);
          callback && callback(data);
        }
      });
    },
    fetchSingleNote: function (id, callback) {
      $.ajax({
        url: '/api/notes/' + id,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          ApiActions.receiveSingleNotes(data);
          callback && callback(data);
        }
      });
    },
    createNote: function (note, callback) {
      $.ajax({
        url: '/api/notes',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({note: note}),
        success: function (data) {
          ApiActions.receiveSingleNote(data);
          callback && callback(data);
        }
      });
    },
    editNote: function (note, callback) {
      var noteId = note.id;
      delete note.id;
      $.ajax({
        url: '/api/notes/' + noteId,
        method: 'PATCH',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({note: note}),
        success: function (data) {
          ApiActions.receiveSingleNote(data);
          callback && callback(data);
        }
      });
    },
    destroyNote: function (note, callback) {
      $.ajax({
        url: '/api/notes/' + note.id,
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          ApiActions.deleteNote(data);
          callback && callback(data);
        }
      });
    }
  };
}(this));
