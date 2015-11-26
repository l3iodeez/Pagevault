json.extract!(
share,
:id, :note_id, :user_id, :is_writable, :created_at, :updated_at
)
  json.extract!(share.user,
  :name, :email
  )
