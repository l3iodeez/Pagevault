class User < ActiveRecord::Base
  validates :email, :username, :session_token, presence: true
  validates :password, length: { minimum: 8, allow_nil: true }
  after_initialize :ensure_session_token


  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)

    return nil unless user
    return user if user.is_password?(password)
    nil
  end

  def password
    @password
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
