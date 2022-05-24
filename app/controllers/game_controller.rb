class GameController < ApplicationController
  def index
    @users = User.all.order(hiscore: "DESC")
  end
end
