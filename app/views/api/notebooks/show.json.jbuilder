
json.extract!(
@notebook,
:id, :title, :description, :user_id, :created_at, :updated_at
)
json.notes do
  json.array!(@notebook.notes) do |note|
    json.extract!(
    note,
      :id, :title, :body, :is_archived
    )
  end
end
