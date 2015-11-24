json.extract!(
note,
:id, :title, :body, :is_archived, :notebook_id, :created_at, :updated_at
)
json.tags do
  json.array!(note.tags.map{|tag| tag.tag })
end
