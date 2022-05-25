class GameController < ApplicationController
  def index
    @users = User.all.order(hiscore: "DESC")
  end

  def show
    @user = User.find_by(id: params[:id])

    return if @user.present?

    flash[:notice] = I18n.t("errors.messages.returned_to_the_ranking_page_because_the_specified_user_did_not_exist")
    redirect_to(game_index_path)
  end
end
