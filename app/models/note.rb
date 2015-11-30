class Note < ActiveRecord::Base
  belongs_to :user
  belongs_to :notebook
  has_many :image_uploads
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
  has_many :shares
  fuzzily_searchable :searchable, async: true

  def searchable
    body + " " + title + " " + tag_ids.to_s + " " + notebook_strings
  end

  def searchable_changed?
    search_hash_changed?
  end

  def tag_strings
    tag_strings = ""
    tags.each do |tag|
      tag_strings += (" " + tag.tag)
    end
    tag_strings
  end
  def notebook_strings
    notebook.title.to_s + " " + notebook.description.to_s

  end
end
