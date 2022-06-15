require 'rails_helper'

RSpec.describe "devise_guest_login", type: :request do

  describe 'ゲストユーザーのログインコントローラテスト' do
    before do
      post users_guest_sign_in_path
    end

    it 'リクエストが成功すること' do
      expect(response.status).to eq 302
    end

    it 'リダイレクトされること' do
      expect(response).to redirect_to root_url
    end

    it 'ログインすること' do
      expect(controller.user_signed_in?).to be true
    end

    it 'ログインしたアカウントのemailがguest@example.comに設定すること' do
      expect(controller.current_user.email).to eq "guest@example.com"
    end
  end
end
