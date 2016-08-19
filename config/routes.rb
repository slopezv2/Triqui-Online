Rails.application.routes.draw do
  root 'welcome#index'

  get 'welcome/signup'

  get 'welcome/profile'

  get 'welcome/game'

  post 'login/' => 'welcome#login'
  post 'register/' => 'welcome#create'

  get 'welcome/salir' => 'welcome#salir'
  mount ActionCable.server => '/cable'  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
