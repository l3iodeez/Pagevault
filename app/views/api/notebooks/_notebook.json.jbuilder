fields = [:id, :title, :description, :user_id, :created_at, :updated_at]
if !show_notes
  if notebook.notes.first
    json.firstNote do
      json.partial!('/api/notes/note', note: notebook.notes.order(updated_at: :desc).first)
    end
  else
    json.firstNote do
      nil
    end
  end
end
json.extract!(notebook, *fields )
json.owner do
  json.extract!(notebook.user, :id, :email, :name )
end
if show_notes && notebook.notes.first
  json.notes do
    json.array!(notebook.notes) do |note|
      json.partial!('/api/notes/note', note: note)
    end
  end
end
json.tags do
  json.array!(notebook.tags.map{|tag| tag.tag })
end
