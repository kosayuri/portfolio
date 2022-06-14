require 'rails_helper'

RSpec.describe "devise_sign_up", type: :request do
  let(:user) { create(:user) }
  let(:user_params) { attributes_for(:user) }
  let(:none_password_user_params) { attributes_for(:user, name: "", email: "", password: "", password_confirmation: "test") }
  let(:insufficient_password_user_params) { attributes_for(:user, password: "test") }

  describe 'アカウント登録のコントローラテスト' do
    before do
      ActionMailer::Base.deliveries.clear
    end

    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        post user_registration_path, params: { user: user_params }
        expect(response.status).to eq 302
      end

      it 'createが成功すること' do
        expect do
          post user_registration_path, params: { user: user_params }
        end.to change(User, :count).by 1
      end

      it 'リダイレクトされること' do
        post user_registration_path, params: { user: user_params }
        expect(response).to redirect_to root_url
      end
    end

    context 'パラメータが不正な場合' do
      it 'リクエストが成功すること' do
        post user_registration_path, params: { user: none_password_user_params }
        expect(response.status).to eq 200
      end

      it 'createが失敗すること' do
        expect do
          post user_registration_path, params: { user: none_password_user_params }
        end.to_not change(User, :count)
      end

      it 'Eメールを入力してくださいが表示されること' do
        post user_registration_path, params: { user: none_password_user_params }
        expect(response.body).to include 'Eメールを入力してください'
      end

      it 'パスワードを入力してくださいが表示されること' do
        post user_registration_path, params: { user: none_password_user_params }
        expect(response.body).to include 'パスワードを入力してください'
      end

      it 'パスワード（確認用）とパスワードの入力が一致しませんが表示されること' do
        post user_registration_path, params: { user: none_password_user_params }
        expect(response.body).to include 'パスワード（確認用）とパスワードの入力が一致しません'
      end

      it '名前を入力してくださいが表示されること' do
        post user_registration_path, params: { user: none_password_user_params }
        expect(response.body).to include '名前を入力してください'
      end

      it 'パスワードは6文字以上で入力してくださいが表示されること' do
        post user_registration_path, params: { user: insufficient_password_user_params }
        expect(response.body).to include 'パスワードは6文字以上で入力してください'
      end
    end
  end
end
