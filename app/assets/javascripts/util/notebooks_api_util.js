(function(root) {
  'use strict';
  var NotebooksAPIUtil = root.NotebooksAPIUtil = {
    fetchAllNotebooks: function (callback) {
      $.ajax({
        url: '/api/notebooks',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          ApiActions.receiveAllNotebooks(data);
          callback && callback(data);
        }
      });
    },
    fetchSingleNotebook: function (id, callback) {
      $.ajax({
        url: '/api/notebooks/' + id,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          ApiActions.receiveSingleNotebooks(data);
          callback && callback(data);
        }
      });
    },
    createNotebook: function (notebook, callback) {
      $.ajax({
        url: '/api/notebooks',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({notebook: notebook}),
        success: function (data) {
          ApiActions.receiveSingleNotebook(data);
          callback && callback(data);
        }
      });
    },
    editNotebook: function (notebook, callback) {
      var notebookId = notebook.id;
      delete notebook.id;
      $.ajax({
        url: '/api/notebooks/' + notebookId,
        method: 'PATCH',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({notebook: notebook}),
        success: function (data) {
          ApiActions.receiveSingleNotebook(data);
          callback && callback(data);
        }
      });
    },
    destroyNotebook: function (notebook, callback) {
      $.ajax({
        url: '/api/notebooks/' + notebook.id,
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          ApiActions.deleteNotebook(data);
          callback && callback(data);
        }
      });
    }
  };
}(this));
