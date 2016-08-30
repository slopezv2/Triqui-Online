class User < ApplicationRecord
    include Gravtastic
    has_secure_password
    validates :email, presence: true
    gravtastic

    def win
        increment(:total_games)
        increment(:won_games)
        self.save    
    end
    def lose
        increment(:total_games)
        increment(:lost_games)
        self.save    
    end
    def draw
        increment(:total_games)
        self.save
    end
end
