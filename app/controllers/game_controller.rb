class GameController < ApplicationController
  def index
    @users = User.all.order(hiscore: "DESC")
  end

  def show
    @user = User.find_by(id: params[:id])
  end
end
