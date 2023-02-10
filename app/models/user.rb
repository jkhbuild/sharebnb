class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::Email_REGEXP }
    validates :first_name, :last_name, :password_digest, :session_token, presence: true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 8 }, allow_nil: true
end
