Rails.application.routes.draw do
  resources :game, only: [:index, :show, :edit, :update, :new, :create]
  root 'home#index'
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
