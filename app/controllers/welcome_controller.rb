class WelcomeController < ApplicationController
  def index
  end

  def login
    user = User.find_by email: login_params[:email]
    if user && user.authenticate(login_params[:password])
      session[:user_id] = user.id
      redirect_to '/welcome/profile'
    else
     flash.now[:error] = "Error en las credenciales de usuario"
      render action: "index"
    end
    end
  end

  def signup
  end

  def profile
  end

  def game
  end
  def create
    user = User.new(create_params)
    if user.save
      flash[:notice] = "Cuenta creada exitosamente"
      redirect_to root_url
    else
      flash.now[:error] = "No se pudo crear la cuenta"
      render action: "signup"
    end
  end

  private

  def create_params
    params.require(:user).permit(:email,:password,:password_confirmation,:authenticity_token)
  end
  def login_params
    params.permit(:email, :password,:authenticity_token)
end
