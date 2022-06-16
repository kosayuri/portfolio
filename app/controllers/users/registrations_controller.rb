class Users::RegistrationsController < Devise::RegistrationsController
  before_action :ensure_normal_user, only: [:update, :destroy]

  def update
    super
    update_internal
  end

  def destroy
    super
    destroy_internal
  end

  def update_internal; end

  def destroy_internal; end

  def ensure_normal_user
    redirect_to root_path, alert: I18n.t("errors.messages.cannot_be_updated_and_deleted", name: "ゲストユーザー") if resource.email == 'guest@example.com'
  end
end
