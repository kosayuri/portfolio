require 'rails_helper'

RSpec.describe "devise_edit", type: :request do
  let(:user) { create(:user) }
  let(:avatar_file) { Rack::Test::UploadedFile.new(File.join('spec', 'fixtures', 'edittest.png')) }
  let(:user_edit) {attributes_for(:user, avatar: avatar_file, name: "edittest", email: "test@edit",comment:"commentedit",password: "passwordedit", password_confirmation: "passwordedit", current_password: "testuser" )}
  let(:bad_current_password_user_edit) {attributes_for(:user, avatar: avatar_file, name: "edittest", email: "test@edit",comment:"commentedit",password: "passwordedit", password_confirmation: "passwordedit", current_password: "" )}

  describe 'ユーザー編集のコントローラテスト' do
    context '確認用パスワードを入力した場合' do
      before do
        sign_in user
        patch user_registration_path, params: { user: user_edit }
      end

        it 'リクエストが成功すること' do
          expect(response.status).to eq 302
        end

        it 'リダイレクトされること' do
          expect(response).to redirect_to root_url
        end

        it 'avatarがedittest.pngに変更すること' do
          expect(User.first.avatar.identifier).to eq "edittest.png"
        end

        it 'nameがedittestに変更すること' do
          expect(User.first.name).to eq "edittest"
        end

        it 'nameがedittestに変更すること' do
          expect(User.first.name).to eq "edittest"
        end

        it 'emailがtest@editに変更すること' do
          expect(User.first.email).to eq "test@edit"
        end

        it 'commentがcommenteditに変更すること' do
          expect(User.first.comment).to eq "commentedit"
        end

        it 'passwordがpasswordeditに変更すること' do
          expect(User.first.valid_password?("passwordedit")).to eq true
        end
    end

    context '確認用パスワードを入力しなかった場合' do
      before do
        sign_in user
        patch user_registration_path, params: { user: bad_current_password_user_edit }
      end

        it 'リクエストが成功すること' do
          expect(response.status).to eq 200
        end

        it '現在のパスワードを入力してくださいが表示すること' do
          expect(response.body).to include '現在のパスワードを入力してください'
        end

        it 'avatarがedittest.pngに変更しないこと' do
          expect(User.first.avatar.identifier).to_not eq "edittest.png"
        end

        it 'nameがedittestに変更しないこと' do
          expect(User.first.name).to_not eq "edittest"
        end

        it 'nameがedittestに変更しないこと' do
          expect(User.first.name).to_not eq "edittest"
        end

        it 'emailがtest@editに変更しないこと' do
          expect(User.first.email).to_not eq "test@edit"
        end

        it 'commentがcommenteditに変更しないこと' do
          expect(User.first.comment).to_not eq "commentedit"
        end

        it 'passwordがpasswordeditに変更しないこと' do
          expect(User.first.valid_password?("passwordedit")).to_not eq true
        end
    end
  end
end
