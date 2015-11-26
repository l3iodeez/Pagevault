json.array!(@users) do |user|
  json.extract!(
  user,
  :email,
  :name
  )
end
