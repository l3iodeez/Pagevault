# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

lorem = <<-TEXT
Lorem ipsum dolor sit amet, consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum."
TEXT

tag_names = [
  "work",
  "play",
  "travel",
  "kids",
  "vacation",
  "pets",
  "family",
  "code"
]
tags = []
tag_names.each do |tag|
  tags << Tag.create!(tag: tag)
end

10.times do |i|
  p "user #{i+1}"
  user_data = {
    email: Faker::Internet.email,
    name: Faker::Internet.user_name,
    password: "password",
  }
  user = User.create!(user_data)

  3.times do |k|
    notebook_data = {
      title:  "#{user.name}'s Notebook Number #{k+1}'",
      description: "#{user.name}'s Notebook Number #{k+1}'",
      user_id: user.id,
      tags: [tags.sample]
    }

    nb = Notebook.create!(notebook_data)

    5.times do |j|
      note_data = {
        title: "#{user.name}'s Note Number #{(j+1) * (k+1)}'",
        body: lorem,
        is_archived: false,
        notebook_id: nb.id,
        tags: [tags.sample, tags.sample, tags.sample]

      }
      user.notes.create!(note_data)
    end
  end


end
