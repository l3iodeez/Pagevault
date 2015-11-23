json.array!(@notebooks) do |notebook|
  json.extract!(
  notebook,
  :id, :title, :description, :user_id, :created_at, :updated_at
  )
  json.firstNote do
    json.extract!(
    notebook.notes.first,
    :id, :title, :body, :is_archived)
  end
end
