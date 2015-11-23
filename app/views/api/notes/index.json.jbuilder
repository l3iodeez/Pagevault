json.array!(@notes) do |note|
  json.extract!(
  note,
  :id, :title, :body, :is_archived, :notebook_id, :created_at, :updated_at
  )
end
