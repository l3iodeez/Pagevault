json.array!(@notebooks) do |notebook|
  json.partial!('notebook', notebook: notebook, show_notes: false)
end
