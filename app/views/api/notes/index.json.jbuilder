json.array!(@notes) do |note|
  json.extract!(
  note,
  :id, :title, :body, :is_archived, :created_at, :updated_at
  )
end
