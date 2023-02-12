class User < ApplicationRecord
    has_secure_password
    
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :first_name, :last_name, :password_digest, :session_token, presence: true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 8, message: "*This value is too short" }, allow_nil: true

    attr_reader :password
    before_validation :ensure_session_token

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        
        if user&.authenticate(password) 
            return user
        else
            nil 
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        session_token
    end

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

end
