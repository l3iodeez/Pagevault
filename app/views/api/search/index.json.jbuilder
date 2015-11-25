json.array!(@results) do |note|
  json.partial!('/api/notes/note', note: note)
end
