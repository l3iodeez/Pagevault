json.extract!(
note,
:id, :title, :body, :is_archived, :is_encrypted, :notebook_id, :created_at, :updated_at
)
if note.image_uploads.length > 0
  json.thumbnail(note.image_uploads.last.image.url(:thumb))
  dimensions = note.image_uploads.last.dimensions
  json.portrait(dimensions[1] > dimensions[0])
end
json.is_writable (current_user.id == note.user.id || !!(Share.where(note_id: note.id, user_id: current_user.id, is_writable: true).first))
json.owner do
  json.extract!(note.user, :id, :email, :name)
end
json.tags do
  json.array!(note.tags.map{|tag| tag.tag })
end
