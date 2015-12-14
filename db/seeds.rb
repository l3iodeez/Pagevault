# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

inspection_body = <<-HTML
HTML


vacation = JSON.parse(open('./db/CostaRica.json').read)
capstone = JSON.parse(open('./db/Capstone.json').read)
capstoneNotebook = JSON.parse(open('./db/CapstoneNotebook.json').read)
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
  demo_user = User.create!({email: 'DemoUser@pagevault.io', name: 'DemoUser', password:'password'})
  demo_notebook = demo_user.notebooks.create!(title: "#{demo_user.name}'s Notebook'")

  vacation[:notebook_id] = demo_notebook.id
  
  demo_user.notes.create!(vacation)
  demo_user.notebooks.create!(capstoneNotebook)
  demo_user.notes.create!(capstone)


  # user = User.create!({
  #   email: "user",
  #   password: "password",
  #   name: "carl"
  #   })
  # nb = Notebook.create!(title: "notebook", description: "", user_id: user.id)
  # note_data = {
  #         title: "ipsum",
  #         body: "lorem",
  #         is_archived: false,
  #         notebook_id: nb.id,
  #         tags: [],
  #         user_id: user.id
  #       }
  # nb.notes.create!(note_data)

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
        note = user.notes.create!(note_data)

      end
    end
  end
