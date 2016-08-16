class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  def autenticado
    if session[:user_id]
      return true
    end
    return false
  end
end
