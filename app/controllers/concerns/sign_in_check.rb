module SignInCheck
  def sign_in_check
    return if user_signed_in?

    flash[:notice] = I18n.t("errors.messages.please_login")
    redirect_to(new_user_session_path)
  end
end
