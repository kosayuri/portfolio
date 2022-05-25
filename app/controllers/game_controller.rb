class GameController < ApplicationController
  def index
    @users = User.all.order(hiscore: "DESC")
  end

  def show
    @user = User.find_by(id: params[:id])

    if @user == nil
      flash[:notice] = "指定のユーザーが存在しなかったため、ランキングページに戻りました。"
      redirect_to(game_index_path)
    end
  end
end
