(function(root) {
  'use strict';
  var ImageAPIUtil = root.ImageAPIUtil = {
    createImage: function (image, noteId, callback) {

      $.ajax({
        url: '/api/images',
        method: 'POST',
        dataType: 'json',
        data: {image: image, note_id: noteId},
        success: function (data) {
          callback && callback(data);
        }
      });
    },
  };
}(this));
