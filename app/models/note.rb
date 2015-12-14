class Note < ActiveRecord::Base
  belongs_to :user
  belongs_to :notebook
  has_many :image_uploads, dependent: :destroy
  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings, dependent: :destroy
  has_many :shares, dependent: :destroy
  fuzzily_searchable :searchable, async: true

  def searchable
    if is_encrypted
      title + " " + tag_strings + " " + notebook_strings
    else
      body + " " + title + " " + tag_strings + " " + notebook_strings
    end
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
