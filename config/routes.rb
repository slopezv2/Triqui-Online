Rails.application.routes.draw do
  root 'welcome#index'

  get 'welcome/signup'

  get 'welcome/perfil'

  get 'welcome/game'

  post 'login/' => 'welcome#login'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
