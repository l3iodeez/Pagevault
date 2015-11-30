# Pagevault

Pagevault is an app for the online storage of encrypted or unencrypted notes,
including rich text formatting and embedded images. All encryption is performed
on the client side and the passphrase is never stored, so the system is secure
in the case of database theft. Unencrypted images are saved to AWS. While in
encrypted mode, images are saved inline with base64 encoding and encrypted along
with the rest of the message.


## Setup
  1. bundle install
  2. bundle exec rake db:setup
  3. foreman start


### Technology Stack
  - [React](https://facebook.github.io/react/)
  - [Flux](https://github.com/facebook/flux)
  - [Rails](https://github.com/rails/rails)

### Packages Used
  - [Paperclip](https://github.com/thoughtbot/paperclip)
  - [TinyMCE](https://github.com/tinymce/tinymce)
  - [SJCL](https://github.com/bitwiseshiftleft/sjcl)
