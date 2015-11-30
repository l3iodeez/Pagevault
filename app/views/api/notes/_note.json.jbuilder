json.extract!(
note,
:id, :title, :body, :is_archived, :notebook_id, :created_at, :updated_at
)
if note.image_uploads.length > 0
  json.thumbnail(note.image_uploads.last.image.url(:thumb))
end
json.tags do
  json.array!(note.tags.map{|tag| tag.tag })
end
