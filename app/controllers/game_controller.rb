class GameController < ApplicationController
  def index
    @user = User.all.order(hiscore: "DESC")
  end
end
