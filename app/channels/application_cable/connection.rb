module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :email

    def connect
      self.email = find_verified_user
    end

    protected
    def find_verified_user
        if email = User.find_by(id: session[:user_id])
          email
        else
          reject_unauthorized_connection
        end
      end
  end
end
