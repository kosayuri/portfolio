class Users::SessionsController < Devise::SessionsController
  def guest_sign_in
    user = User.guest
    sign_in user
    redirect_to root_path, notice: I18n.t("activerecord.messages.logged_in_as", name: "ゲストユーザー")
  end
end
