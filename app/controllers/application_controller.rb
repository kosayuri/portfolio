class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception           # クロスサイトリクエストフォージェリ (CSRF)への対応策

  before_action :configure_permitted_parameters, if: :devise_controller?
  # devise_controllerを使うときしか処理しない

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :comment, :avatar])
  end
end
