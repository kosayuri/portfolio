require 'rails_helper'

RSpec.describe "devise/registrations/edit.html.erb", type: :feature do
  describe "ユーザー編集ページのテスト" do
    let(:user) { create(:user) }

    before do
      sign_in user
      visit edit_user_registration_path
    end

    it "ひま撃ちのリンクを正しく表示すること" do
      expect(page).to have_link "ひま撃ち", href: root_path
    end

    it "プロフィール変更のリンクを正しく表示すること" do
      expect(page).to have_link "プロフィール変更", href: edit_user_registration_path
    end

    it "ログアウトのリンクを正しく表示すること" do
      expect(page).to have_link "ログアウト", href: destroy_user_session_path
    end

    it "フォームのリンクが正しいこと" do
      expect(page).to have_selector "form[action='#{user_registration_path}']"
    end

    it "アバター画像の入力欄を表示すること" do
      expect(page).to have_selector 'input[name="user[avatar]"]'
    end

    it "名前の入力欄を表示すること" do
      expect(page).to have_selector 'input[name="user[name]"]'
    end

    it "Eメールの入力欄を表示すること" do
      expect(page).to have_selector 'input[name="user[email]"]'
    end

    it "コメントの入力欄を表示すること" do
      expect(page).to have_selector 'textarea[name="user[comment]"]'
    end

    it "パスワードの入力欄を表示すること" do
      expect(page).to have_selector 'input[name="user[password]"]'
    end

    it "パスワード（確認用）の入力欄を表示すること" do
      expect(page).to have_selector 'input[name="user[password_confirmation]"]'
    end

    it "現在のパスワードの入力欄を表示すること" do
      expect(page).to have_selector 'input[name="user[current_password]"]'
    end

    it "アカウント削除ボタンを表示すること" do
      expect(page).to have_selector 'input[value="アカウント削除"]'
    end
  end
end
