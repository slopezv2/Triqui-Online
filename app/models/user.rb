class User < ApplicationRecord
    include Gravtastic
    has_secure_password
    validates :email, presence: true
    gravtastic
end
