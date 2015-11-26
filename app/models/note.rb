class Note < ActiveRecord::Base
  belongs_to :user
  belongs_to :notebook
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
  has_many :images, dependent: :destroy
  fuzzily_searchable :searchable, async: true

  def searchable
    # body + " " + title + " " + tag_strings + " " + notebook_strings
    body + " " + title
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
    notebook.title + " " + notebook.description

  end
end
