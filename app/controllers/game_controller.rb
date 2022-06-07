class GameController < ApplicationController
  before_action :sign_in_check, only: [:update, :edit, :new, :create]

  def index
    @users = User.all.order(hiscore: "DESC")
  end

  def show
    @user = User.find_by(id: params[:id])

    return if @user.present?

    flash[:notice] = I18n.t("errors.messages.returned_to_the_ranking_page_because_the_specified_user_did_not_exist")
    redirect_to(game_index_path)
  end

  def new; end

  def create
    score = params[:score].to_i

    if current_user.hiscore < score
      current_user.hiscore = score
      current_user.save
      flash[:notice] = I18n.t("activerecord.messages.hiscore_update")
    else
      flash[:notice] = I18n.t("activerecord.messages.not_updating_hiscore")
    end

    redirect_to(game_index_path)
  end

  def edit; end

  def update
    current_user.se_volume=params[:user][:se_volume]
    current_user.bgm_volume=params[:user][:bgm_volume]

    if current_user.save
      flash[:notice]=I18n.t("activerecord.messages.setup_save")
      redirect_to(root_path)
    else
      flash[:notice]=current_user.errors.full_messages.join('<br>')
      redirect_to(edit_game_path(current_user.id))
    end
  end

  def sign_in_check
    unless user_signed_in?
      flash[:notice] = I18n.t("errors.messages.please_login")
      redirect_to(new_user_session_path)
    end
  end
end
