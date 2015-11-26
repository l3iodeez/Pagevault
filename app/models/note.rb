class Note < ActiveRecord::Base
  belongs_to :user
  belongs_to :notebook
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
  fuzzily_searchable :searchable, async: true

  def searchable
    body + " " + title + " " + tag_strings + " " + notebook_strings
  end

  def searchable_changed?
    body_changed? || title_changed? || tags.any? {|a| a.changed?}  || notebook.title_changed? || notebook.description_changed?
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
