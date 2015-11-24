class Notebook < ActiveRecord::Base
  belongs_to :user
  has_many :notes, dependent: :destroy
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
end
