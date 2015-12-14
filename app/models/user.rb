class User < ActiveRecord::Base
  validates :email, :name, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }
  after_initialize :ensure_session_token
  fuzzily_searchable :contact, async: true


  has_many :notes, dependent: :destroy
  has_many :notebooks, dependent: :destroy
  has_many :sharings, through: :notes, source: :shares
  has_many(
    :access_grants,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "Share"
  )
  has_many :accessible_notes, through: :access_grants, source: :note
  has_many :accessible_notebooks, through: :accessible_notes, source: :notebook


  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    return nil unless user
    return user if user.is_password?(password)
    nil
  end

  def password
    @password
  end
  def contact
    name + " " + email
  end

  def contact_changed?
    name_changed? || email_changed?
  end

  def password=(input_password)
    @password = input_password
    self.password_digest = BCrypt::Password.create(input_password)
  end

  def is_password?(input_password)
    BCrypt::Password.new(self.password_digest).is_password?(input_password)
  end

  def generate_session_token
    token = SecureRandom::urlsafe_base64(16)
    while User.exists?(session_token: token)
      token = SecureRandom::urlsafe_base64(16)
    end
    token
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
  end

end
