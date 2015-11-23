json.array!(@notebooks) do |notebook|
  json.extract!(
  notebook,
  :id, :title, :description, :user_id, :created_at, :updated_at
  )
end
