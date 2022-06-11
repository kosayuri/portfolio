class HomeController < ApplicationController
  def index
      @game_status = { hiscore: current_user.hiscore, se_volume: current_user.se_volume, bgm_volume: current_user.bgm_volume } if user_signed_in?

  end
end
