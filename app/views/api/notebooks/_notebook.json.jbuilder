fields = [:id, :title, :description, :user_id, :created_at, :updated_at]
if !show_notes
  if notebook.notes.first
    json.firstNote do
      json.extract!(
      notebook.notes.first,
      :id, :title, :body, :is_archived)
    end
  else
    json.firstNote do
      nil
    end
  end
end
json.extract!(notebook, *fields )

if show_notes && notebook.notes.first
  json.notes do
    json.array!(notebook.notes) do |note|
      json.extract!(
      note,
        :id, :title, :body, :is_archived
      )
    end
  end
end
