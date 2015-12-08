# TODO list
  1. Notebook index items should be miniforms for editing notebook params.
  2. Change "New notebook" link to an icon.
  3. Better styling on encryption controls.
    - Encrypt/Decrypt button.
    - Delete button.
  4. Lock note immediately upon encryption.
  5. Require password confirmation when encrypting.
    - Provide error messages, create reusable method for errors on modals.
  6. Create better seed file.
    - Resets all users.
    - Creates encrypted and unencrypted notes.
    - Uploads local images to AWS, embeds links properly.
    - Creates a note with the password to the encrypted notes.
  7. Provide warning message modal when encrypting notes.
    - Should be able to be hidden on a per user basis.
  8. About page
    - Intro to app
    - Explanation of encryption methods.
    - Warning about losing access to encrypted notes.
  9. Hover text on all icon controls.


About:
  Pagevault is an online note taking app with rich text and embedded image capability.
  It also includes the ability to encrypt notes before they are transfered to the server.
  The password used for the encryption is never store or transfered over the internet,
  which has two implications. The first is that if you lose the password it CANNOT
  be recovered by Pagevault. Any encrypted notes for which you do not have the password
  are lost forever.

Warning:
  By clicking below you acknowledge your understanding that Pagevault does not retain
  copies of encryption passwords.
  If you lose or forget this password you will not be able to access your notes. 
