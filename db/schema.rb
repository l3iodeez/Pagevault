# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151215153300) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "image_uploads", force: :cascade do |t|
    t.integer  "note_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.json     "dimensions",         null: false
  end

  add_index "image_uploads", ["note_id"], name: "index_image_uploads_on_note_id", using: :btree

  create_table "notebooks", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "title"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "notebooks", ["user_id"], name: "index_notebooks_on_user_id", using: :btree

  create_table "notes", force: :cascade do |t|
    t.string   "title",                        null: false
    t.text     "body",                         null: false
    t.integer  "user_id",                      null: false
    t.boolean  "is_archived",  default: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "notebook_id"
    t.string   "search_hash"
    t.boolean  "is_encrypted", default: false
  end

  add_index "notes", ["user_id"], name: "index_notes_on_user_id", using: :btree

  create_table "shares", force: :cascade do |t|
    t.integer  "note_id"
    t.integer  "user_id"
    t.boolean  "is_writable", default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "shares", ["note_id"], name: "index_shares_on_note_id", using: :btree
  add_index "shares", ["user_id"], name: "index_shares_on_user_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
  add_index "taggings", ["taggable_type", "taggable_id"], name: "index_taggings_on_taggable_type_and_taggable_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "tag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trigrams", force: :cascade do |t|
    t.string  "trigram",     limit: 3
    t.integer "score",       limit: 2
    t.integer "owner_id"
    t.string  "owner_type"
    t.string  "fuzzy_field"
  end

  add_index "trigrams", ["owner_id", "owner_type", "fuzzy_field", "trigram", "score"], name: "index_for_match", using: :btree
  add_index "trigrams", ["owner_id", "owner_type"], name: "index_by_owner", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                                null: false
    t.string   "name",                                 null: false
    t.string   "password_digest",                      null: false
    t.string   "session_token",                        null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.boolean  "hide_encrypt_warning", default: false
    t.integer  "recent_note_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["name"], name: "index_users_on_name", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

  add_foreign_key "image_uploads", "notes"
  add_foreign_key "notebooks", "users"
  add_foreign_key "notes", "users"
  add_foreign_key "shares", "notes"
  add_foreign_key "shares", "users"
  add_foreign_key "taggings", "tags"
end
