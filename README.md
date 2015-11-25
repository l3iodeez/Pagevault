# PageVault

## Minimum Viable Product

PageVault is a web application inspired by Evernote built using Ruby on Rails
and React.js. PageVault allows users to:

- [X] Create an account
- [X] Log in / Log out
- [X] Create, read, edit, and delete notes
- [X] Organize notes within Notebooks
- [X] Tag notes with multiple tags and search notes by tag
- [ ] Search through notes for blocks of text
- [ ] Apply complex styling to notes while editing
- [ ] Share notes with other users giving them read or read/write access

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Note Model and JSON API (1.5 days)

In Phase 1, I will begin by implementing user registration and authentication (using
BCrypt). Next I will build out the JSON API for the Notes model. Last I will create
a simple landing page with a container for the app's root React component and do some
basic styling.

[Details][phase-one]

### Phase 2: Flux Architecture and Note CRUD (2.5 days)

During Phase 2 I will implement my Flux setup as well as the React Router and
view structure. I will implement a Note store class to manage the client side
data, and the requisite action to implement CRUD functionality via the JSON API.
I will also create a Selected store class to manage the transfer of information
from the index to the main view component. Lastly I will create React components
for the `NoteIndex`, `NoteIndexItem` and `NoteForm` objects. When this phase
is over Notes can be created edited and deleted in the browser, and will be
persisted to the database when the editor is left idle. I will also style for
structure and visibility, add a logo and a few icons.

[Details][phase-two]

### Phase 3: Notebooks and Tags (2 days)

In Phase 3 I will add the Notebooks, Tags and Taggings models to the JSON API
and create the React components to interact with them. Notes belong to a Notebook.
The Notebook index view will show the NoteIndex for each notebook when selected,
sliding over the Note form. Notes can be tagged with multiple non-heirarchical
tags. I will create the search box React component which will allow for searching
of Notes by tag and text. Once this is done, I will implement fuzzy search.

[Details][phase-three]

### Phase 4: Allow Complex Styling in Notes and Image uploading (2 days)

Using tinymce, allow for complex styling of notes. Using paperclip and S3, allow
for image uploads, and embedding of images in note text.

[Details][phase-four]

### Phase 5: Sharing (1 day)

In Phase 5 I will add the ability to share Notes and Notebooks with other users.
Notes and Notebooks that are shared can be shared with read only or read/write
access. Other users can be searched by username or email.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

In Phase 6 I will prettify all of the things and fix any remaining styling issues.
I will create seed data. I will also convert some of my React views to modal overlay
forms.

### Bonus Features (TBD)
- [ ] Client-side note encryption
- [ ] Prettify transitions
- [ ] Simultaneous Editing
- [ ] Reminders
- [ ] Changelogs for Notes
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
