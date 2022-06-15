require 'rails_helper'

RSpec.describe "devise_sign_out", type: :request do
  let(:user) { create(:user) }

  describe 'ログアウトのコントローラテスト' do
    context 'ログイン済み場合' do
      before do
        sign_in user
        delete destroy_user_session_path
      end

      it 'リクエストが成功すること' do
        expect(response.status).to eq 302
      end

      it 'リダイレクトされること' do
        expect(response).to redirect_to root_url
      end

      it 'ログアウトされること' do
        expect(controller.user_signed_in?).to be false
      end
    end

    context 'まだログインしていない場合' do
      before do
        delete destroy_user_session_path
      end

      it 'リクエストが成功すること' do
        expect(response.status).to eq 302
      end

      it 'リダイレクトされること' do
        expect(response).to redirect_to root_url
      end
    end
  end
end
