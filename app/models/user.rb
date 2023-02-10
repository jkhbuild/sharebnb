class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::Email_REGEXP }
    validates :first_name, :last_name, :password_digest, :session_token, presence: true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 8 }, allow_nil: true

    before_validation :ensure_session_token

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

end
