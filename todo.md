# To do list
  - [x] Better styling on encryption controls.
      - Encrypt/Decrypt button.
      - Delete button.
  - [X] Provide warning message modal when encrypting notes.
      - Should be able to be hidden on a per user basis.
  - [ ] About page
    - Intro to app
    - Explanation of encryption methods.
    - Warning about losing access to encrypted notes.
  - [ ] Complete note sharing features
    - Shared notes should be marked as such.
    - Backend ensures users cannot update notes to which they don't have access.
    - No option for user to change password of a shared note.
      - This can be bypassed if the user changes the password in the component
      state before saving the note. I can't think of a way to prevent this without
      compromising password security. Needs research.
  - [ ] Notebook index items should be miniforms for editing notebook params.
  - [ ] Change "New notebook" link to an icon.
  - [ ] Lock note immediately upon encryption.
  - [ ] Require password confirmation when encrypting.
    - Provide error messages, create reusable method for errors on modals.
  - [ ] Create better seed file.
    - Resets all users.
    - Creates encrypted and unencrypted notes.
    - Uploads local images to AWS, embeds links properly.
    - Creates a note with the password to the encrypted notes.
    - Creates notes with good search targets in body, title and tags
  - [ ] Hover text on all icon controls.
  - [ ] Add more tinyMCE plugins for list formatting and whatever else.
  - [ ] User account options page.
    - Change name
    - Change password
    - Change warning message prefs
  - [ ] Email confirmation with ActionMailer

About:
  Pagevault is an online note taking app with rich text and embedded image capability.
  It also includes the ability to encrypt notes before they are transfered to the server.
  The password used for the encryption is never store or transfered over the internet,
  which has two implications. The first is that if you lose the password it CANNOT
  be recovered by Pagevault. Any encrypted notes for which you do not have the password
  are lost forever.

  It is also important to note that only the body text of a note is encrypted. The title,
  tags, and notebook data are sent in plaintext. If this were not the case then searching
  would be impossible, and notes could only be recognized by an ID number. Any data that
  is meant to be encrypted should be entered into the note body only.

Warning:
  By clicking below you acknowledge your understanding that Pagevault does not retain
  copies of encryption passwords.
  If you lose or forget this password you will not be able to access your notes.
