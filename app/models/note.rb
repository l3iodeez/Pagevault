class Note < ActiveRecord::Base
  belongs_to :user
  belongs_to :notebook
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
end
