# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

inspection_body = <<-HTML
<p><span style="font-family: 'andale mono', monospace; font-size: 12pt;">Samples taken:</span><br clear="none" /><span style="font-family: 'andale mono', monospace; font-size: 12pt;">Basement - stairway</span><br clear="none" /><span style="font-family: 'andale mono', monospace; font-size: 12pt;">Basement - main room</span><br clear="none" /><span style="font-family: 'andale mono', monospace; font-size: 12pt;">ground floor - main room</span><br clear="none" /><span style="font-family: 'andale mono', monospace; font-size: 12pt;">2x outdoors</span></p>
<div><span style="font-size: 12pt;">&nbsp;</span></div>
<p><span style="font-family: 'andale mono', monospace; font-size: 12pt;">Basement stairs&nbsp;</span></p>
<p><img class="en-media" src="https://www.evernote.com/shard/s341/res/6ca557d4-7131-44f4-8eb2-c70d6fee5477/IMG_20150527_140952.610.jpg" alt="" width="319" height="425" name="6ca557d4-7131-44f4-8eb2-c70d6fee5477" /></p>
<div><span style="font-size: 12pt; font-family: 'andale mono', monospace;">Boiler room&nbsp;</span></div>
<div><img class="en-media" src="https://www.evernote.com/shard/s341/res/741cbdad-0f59-4797-bf81-33b46de6f340/IMG_20150527_141001.179.jpg" alt="" width="316" height="422" name="741cbdad-0f59-4797-bf81-33b46de6f340" />g</div>
<div>&nbsp;</div>
<div><span style="font-size: 12pt; font-family: 'andale mono', monospace;">Boiler room ceiling near sample #1&nbsp;</span></div>
<p><img class="en-media" src="https://www.evernote.com/shard/s341/res/e09a8f0a-c92b-45df-b3d6-29220b35cb19/IMG_20150527_141056.007.jpg" alt="" width="257" height="343" name="e09a8f0a-c92b-45df-b3d6-29220b35cb19" /></p>"
HTML

basement_inspection = { body: inspection_body, title: "42-01 main street Inspection notes" }

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
  basement_inspection[:notebook_id] = demo_notebook.id
  vacation[:notebook_id] = demo_notebook.id
  demo_user.notes.create!(basement_inspection)
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

  # tags = []
  # tag_names.each do |tag|
  #   tags << Tag.create!(tag: tag)
  # end
  #
  # 10.times do |i|
  #   p "user #{i+1}"
  #   user_data = {
  #     email: Faker::Internet.email,
  #     name: Faker::Internet.user_name,
  #     password: "password",
  #   }
  #   user = User.create!(user_data)
  #
  #   3.times do |k|
  #     notebook_data = {
  #       title:  "#{user.name}'s Notebook Number #{k+1}'",
  #       description: "#{user.name}'s Notebook Number #{k+1}'",
  #       user_id: user.id,
  #       tags: [tags.sample]
  #     }
  #
  #     nb = Notebook.create!(notebook_data)
  #
  #     5.times do |j|
  #       note_data = {
  #         title: "#{user.name}'s Note Number #{(j+1) * (k+1)}'",
  #         body: lorem,
  #         is_archived: false,
  #         notebook_id: nb.id,
  #         tags: [tags.sample, tags.sample, tags.sample]
  #
  #       }
  #       note = user.notes.create!(note_data)
  #       if user.id > 1
  #         note.shares.create(user_id: (note.user_id - 1), is_writable: false)
  #       end
  #     end
  #   end
  # end
