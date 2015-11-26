json.array!(@shares) do |share|
  json.partial!('share', share: share)
end
